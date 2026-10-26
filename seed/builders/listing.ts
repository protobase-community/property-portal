import { DAY, seedNow } from '../calendar'
import { countryOf } from '../data/countries'
import { fill, type Country } from '../data/country'
import { details, openings } from '../data/names'
import type { PlaceSeed } from '../data/places'
import { exteriorPhoto, roomPhoto } from '../photos/library'
import type { PropertyType, RoomKind } from '../photos/draw'
import { int, pick, rngAt, weighted, type Rand } from '../rng'
import type { SeededAgency } from './agency'
import { personName } from './person'
import { roundPrice } from './price'

type EnergyLabel = 'a_plus_4' | 'a_plus_3' | 'a_plus_2' | 'a_plus' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

export type SeededPhoto = { position: number; photo: string; caption: string }

export type SeededListing = {
  id: number
  agencyId: number
  placeId: number
  country: string
  propertyType: PropertyType
  status: 'available' | 'under_offer' | 'sold' | 'let'
  address: string
  /** Empty where the country has no postal codes. */
  postalCode: string | null
  /** The ISO 4217 currency of its prices. */
  currency: string
  latitude: number
  longitude: number
  /** False when the listing gives its position only roughly. */
  positionExact: boolean
  /** The asking price, empty when the home is not for sale. */
  purchasePrice: number | null
  /** The rent per month, empty when the home is not for rent. */
  rentPrice: number | null
  livingArea: number
  plotArea: number | null
  rooms: number
  bedrooms: number
  bathrooms: number
  builtYear: number
  energyLabel: EnergyLabel | null
  garden: boolean
  balcony: boolean
  parking: boolean
  description: string
  photo: string
  agentName: string
  agentPhone: string
  publishedAt: number | null
  createdAt: number
  photos: SeededPhoto[]
}

const areas: Record<PropertyType, [number, number]> = { apartment: [45, 130], house: [100, 220], townhouse: [90, 180], villa: [160, 420], studio: [22, 45], penthouse: [90, 240] }
const plots: Partial<Record<PropertyType, [number, number]>> = { house: [150, 600], townhouse: [60, 180], villa: [400, 2000] }

// The labels of older homes: the Dutch scale runs from A++++, the EU's from A, and a Spanish certificate is often still
// pending ("en trámite").
const labels = {
  nl: [['a_plus_2', 2], ['a_plus', 6], ['a', 25], ['b', 15], ['c', 20], ['d', 12], ['e', 9], ['f', 6], ['g', 5]],
  eu: [['a', 6], ['b', 6], ['c', 10], ['d', 18], ['e', 33], ['f', 12], ['g', 8], [null, 7]],
} as const
const newBuildLabels = { nl: [['a_plus_4', 2], ['a_plus_3', 3], ['a_plus_2', 4], ['a_plus', 4], ['a', 3]], eu: [['a', 8], ['b', 2]] } as const

const energyLabelOf = (country: Country, builtYear: number, rand: Rand): EnergyLabel | null => {
  if (country.energy === 'none') return null
  return weighted(rand, builtYear >= 2015 ? newBuildLabels[country.energy] : labels[country.energy]) as EnergyLabel | null
}

const flats: readonly PropertyType[] = ['apartment', 'penthouse', 'studio']

const postalOf = (country: Country, place: PlaceSeed, rand: Rand) => (country.postal === null ? null : fill(country.postal.replace('{p}', place.postal), rand))

// Listings run younger: most of the year's were published in its last months.
const ageOf = (rand: Rand) => Math.floor(365 * Math.pow(rand(), 1.6) * DAY)

const statusOf = (offer: 'sale' | 'rent', age: number, rand: Rand): SeededListing['status'] => {
  const days = age / DAY
  const roll = rand()
  if (offer === 'rent') return days > 45 && roll < 0.7 ? 'let' : days > 14 && roll < 0.8 ? 'under_offer' : 'available'
  if (days > 90) return roll < 0.65 ? 'sold' : roll < 0.8 ? 'under_offer' : 'available'
  if (days > 30) return roll < 0.1 ? 'sold' : roll < 0.4 ? 'under_offer' : 'available'
  return 'available'
}

const captions: Record<RoomKind, string> = { living: 'Living room', kitchen: 'Kitchen', bedroom: 'Bedroom', bathroom: 'Bathroom', garden: 'Garden' }

/** The asking price per m² in a place's centre, in its country's currency. */
export const perM2Of = (place: PlaceSeed) => place.perM2 ?? countryOf(place.country).perM2

/**
 * Listing `ordinal`, rebuilt from its ordinal alone: a home in a place picked by weight, listed by an agency there or
 * elsewhere in its country, written and priced the way the country does.
 */
export const listingAt = (places: PlaceSeed[], agenciesByPlace: Map<number, SeededAgency[]>, agenciesByCountry: Map<string, SeededAgency[]>, ordinal: number): SeededListing => {
  const rand = rngAt(401, ordinal)
  const placeIndex = weighted(rand, places.map((place, index) => [index, place.weight] as const))
  const place = places[placeIndex]!
  const country = countryOf(place.country)
  const agency = pick(rand, agenciesByPlace.get(placeIndex + 1) ?? agenciesByCountry.get(place.country)!)
  const propertyType = weighted(rand, country.homes) as PropertyType
  const offerType = rand() < country.forSale ? 'sale' : 'rent'
  const [minArea, maxArea] = areas[propertyType]
  const livingArea = int(rand, minArea, maxArea)
  const rooms = propertyType === 'studio' ? 1 : Math.max(2, Math.min(9, Math.round(livingArea / 30) + int(rand, -1, 1)))
  const plot = plots[propertyType]
  // Townhouses run old, a few from the Middle Ages, as in the centres of Kraków or Praha.
  const builtYear = propertyType === 'townhouse' && rand() < 0.6 ? (rand() < 0.05 ? int(rand, 1350, 1499) : int(rand, 1650, 1930)) : int(rand, 1930, 2025)
  const energyLabel = energyLabelOf(country, builtYear, rand)
  const perM2 = perM2Of(place) * (0.8 + rand() * 0.45) * (propertyType === 'villa' || propertyType === 'penthouse' ? 1.2 : 1)
  // A draw of its own, so the rest of the listing is the same whether it is let in the meantime or not.
  const alsoLet = offerType === 'sale' && rngAt(405, ordinal)() < country.letWhileForSale
  const purchasePrice = offerType === 'sale' ? roundPrice(perM2 * livingArea) : null
  const rentPrice = offerType === 'rent' || alsoLet ? roundPrice((perM2 * livingArea) / (12 * country.priceToRent)) : null
  const garden = plot !== undefined && rand() < 0.85
  const balcony = !garden && rand() < 0.65
  const parking = rand() < 0.35
  const draft = rand() < 0.02
  const age = ageOf(rand)
  const publishedAt = draft ? null : seedNow - age
  const status = draft ? 'available' : statusOf(offerType, age, rand)
  const sentences = [details.transport, details.quiet, details.renovated, details.original, details.insulated].filter(() => rand() < 0.35)
  const description = [
    // The size starts a sentence of its own: a number right after a name in Arabic or Hebrew would join it and show on
    // the wrong side.
    `${pick(rand, openings[propertyType]!)} in ${place.name}.`,
    `It has ${livingArea} m² and ${rooms === 1 ? 'one room' : `${rooms} rooms`}.`,
    ...(garden ? [details.garden] : []),
    ...(balcony ? [details.balcony] : []),
    ...(parking ? [details.parking] : []),
    ...sentences,
    // A line in the country's own language, as an agency there writes it.
    ...(rand() < 0.6 ? [pick(rand, country.lines)] : []),
  ].join(' ')
  const variant = int(rand, 0, 5)
  const shownRooms: RoomKind[] = garden ? ['living', 'kitchen', 'bedroom', 'bathroom', 'garden'] : ['living', 'kitchen', 'bedroom', 'bathroom']
  const inside = shownRooms.slice(0, int(rand, 2, 5))
  const photo = exteriorPhoto(propertyType, variant)
  return {
    id: ordinal + 1,
    agencyId: agency.id,
    placeId: placeIndex + 1,
    country: place.country,
    propertyType,
    status,
    address: country.address(pick(rand, place.streets), rand, flats.includes(propertyType)),
    postalCode: postalOf(country, place, rand),
    currency: country.currency,
    latitude: Number((place.latitude + (rand() - 0.5) * 0.06).toFixed(6)),
    longitude: Number((place.longitude + (rand() - 0.5) * 0.09).toFixed(6)),
    positionExact: rngAt(407, ordinal)() >= country.approximate,
    purchasePrice,
    rentPrice,
    livingArea,
    plotArea: plot ? int(rand, plot[0], plot[1]) : null,
    rooms,
    bedrooms: Math.max(0, rooms - 1 - (rooms > 4 && rand() < 0.5 ? 1 : 0)),
    bathrooms: 1 + (livingArea > 120 ? 1 : 0) + (propertyType === 'villa' ? 1 : 0),
    builtYear,
    energyLabel,
    garden,
    balcony,
    parking,
    description,
    photo,
    agentName: personName(country, rand),
    agentPhone: fill(country.phone.mobile, rand),
    publishedAt,
    createdAt: (publishedAt ?? seedNow) - int(rand, 1, 6) * DAY,
    photos: [{ position: 1, photo, caption: 'Outside' }, ...inside.map((kind, index) => ({ position: index + 2, photo: roomPhoto(kind, variant + index), caption: captions[kind] }))],
  }
}
