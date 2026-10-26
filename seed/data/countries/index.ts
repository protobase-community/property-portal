import type { Country } from '../country'
import { americasCountries } from './americas'
import { asiaCountries } from './asia'
import { europe } from './europe'
import { southCountries } from './south'

/** Every country the portal lists homes in, by ISO 3166-1 alpha-2 code. */
export const countries: Record<string, Country> = { ...europe, ...americasCountries, ...asiaCountries, ...southCountries }

export const countryOf = (code: string) => {
  const country = countries[code]
  if (!country) throw new Error(`No seed data for the country ${code}`)
  return country
}
