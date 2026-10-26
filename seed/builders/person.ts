import type { Country } from '../data/country'
import { pick, type Rand } from '../rng'

/**
 * A name as the country writes it, from one of its pools so it keeps to one script: the family name first where it comes
 * first, without a space where none goes.
 */
export const personName = (country: Country, rand: Rand) => {
  const names = pick(rand, country.agents)
  const first = pick(rand, names.first)
  const last = pick(rand, names.last)
  const joined = names.joined ?? ' '
  return names.familyFirst ? `${last}${joined}${first}` : `${first}${joined}${last}`
}
