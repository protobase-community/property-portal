import { int, type Rand } from '../rng'

/** An agency name's part, with the Latin spelling its web address uses when the part is in another script. */
export type NamePart = string | readonly [text: string, latin: string]

/** What the seed needs to write homes, agencies and people the way a country writes them. */
export type Country = {
  /** ISO 4217: the currency its agencies ask in. */
  currency: string
  /** The agencies' web address ends in it, such as `co.jp`. */
  domain: string
  /** The asking price per m² outside the places that set their own, in the currency. */
  perM2: number
  /** The purchase price over a year's rent: the rent per month is the price over twelve times this. */
  priceToRent: number
  /** The share of its homes offered for sale rather than for rent. */
  forSale: number
  /** The share of the listings that give their position only roughly. */
  approximate: number
  /** The share of the homes for sale that are let in the meantime. */
  letWhileForSale: number
  /** Which energy labels its homes carry: the Dutch scale from A++++, the EU's from A, or none. */
  energy: 'nl' | 'eu' | 'none'
  /** How its homes divide over the property types. */
  homes: HomeMix
  /** Phone numbers as written there: `#` a digit. */
  phone: { office: string; mobile: string }
  /** A postal code: `{p}` the place's own part, `#` a digit, `@` a letter; null where the country has none. */
  postal: string | null
  /** A street address with a number, and the flat's own for a flat: the street is one of the place's. */
  address: (street: string, rand: Rand, flat: boolean) => string
  /** Agency names, each from one pool: a country that writes in two scripts has a pool for each. */
  agencies: readonly AgencyNames[]
  /** People's names, each from one pool, so no name mixes scripts. */
  agents: readonly PersonNames[]
  /** Sentences in the country's own language that a description may end with. */
  lines: readonly string[]
}

/** An agency name is a first part and a second, joined by a space unless `joined` says otherwise. */
export type AgencyNames = { first: readonly NamePart[]; second: readonly NamePart[]; joined?: string }

/** A first name and a family name, the family name first where `familyFirst`, joined by a space unless `joined` says otherwise. */
export type PersonNames = { first: readonly string[]; last: readonly string[]; familyFirst?: boolean; joined?: string }

export type HomeMix = ReadonlyArray<readonly ['apartment' | 'house' | 'townhouse' | 'villa' | 'studio' | 'penthouse', number]>

/** Mostly flats, as in the big cities of East Asia. */
export const towers: HomeMix = [['apartment', 70], ['house', 4], ['townhouse', 2], ['villa', 2], ['studio', 14], ['penthouse', 8]]
/** Flats and houses, as in most of Europe. */
export const mixed: HomeMix = [['apartment', 48], ['house', 18], ['townhouse', 14], ['villa', 6], ['studio', 8], ['penthouse', 6]]
/** Mostly houses with gardens, as in North America and Oceania. */
export const suburbs: HomeMix = [['apartment', 26], ['house', 44], ['townhouse', 14], ['villa', 8], ['studio', 4], ['penthouse', 4]]

const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'

/** A template filled in: each `#` a digit and each `@` a letter. */
export const fill = (template: string, rand: Rand) =>
  template.replace(/[#@]/g, (char) => (char === '#' ? String(int(rand, 0, 9)) : letters[int(rand, 0, letters.length - 1)]!))

export const housenumber = (rand: Rand) => int(rand, 1, 240)
export const floor = (rand: Rand, highest = 12) => int(rand, 1, highest)
/** A flat's number by floor, such as 702 on the seventh. */
export const unit = (rand: Rand, highest = 12) => `${floor(rand, highest)}0${int(rand, 1, 8)}`
