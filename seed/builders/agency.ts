import { countryOf } from '../data/countries'
import { fill, type NamePart } from '../data/country'
import type { PlaceSeed } from '../data/places'
import { slugify } from '../format'
import { pick, rngAt, weighted } from '../rng'

export type SeededAgency = { id: number; name: string; placeId: number; country: string; phone: string; email: string; website: string }

const text = (part: NamePart) => (typeof part === 'string' ? part : part[0])
const latin = (part: NamePart) => (typeof part === 'string' ? slugify(part) : part[1])

// The busiest place of each country, in the order the countries come: where its first agency opens.
const busiest = (places: PlaceSeed[]) => {
  const first = new Map<string, number>()
  for (const [index, place] of places.entries()) {
    const known = first.get(place.country)
    if (known === undefined || place.weight > places[known]!.weight) first.set(place.country, index)
  }
  return [...first.values()]
}

/**
 * Agency `ordinal`, its office in a place picked by how many listings the place draws. The first agencies open one in
 * every country, so each has an agency to list its homes.
 */
export const agencyAt = (places: PlaceSeed[], ordinal: number): SeededAgency => {
  const rand = rngAt(301, ordinal)
  const opening = busiest(places)
  const placeIndex = ordinal < opening.length ? opening[ordinal]! : weighted(rand, places.map((place, index) => [index, place.weight] as const))
  const place = places[placeIndex]!
  const country = countryOf(place.country)
  const names = pick(rand, country.agencies)
  const parts = [pick(rand, names.first), pick(rand, names.second)]
  // Names repeat across places; the place keeps them apart, and the ordinal keeps their sites apart.
  const name = `${parts.map(text).join(names.joined ?? ' ')} ${place.name}`
  const domain = `${parts.map(latin).filter(Boolean).join('-')}-${ordinal + 1}.${country.domain}`
  return { id: ordinal + 1, name, placeId: placeIndex + 1, country: place.country, phone: fill(country.phone.office, rand), email: `info@${domain}`, website: `https://www.${domain}` }
}
