import { describe, expect, it } from 'vitest'
import type { z } from 'zod'
import { agencies, listings, places } from '../config'
import { listingIssues } from '../config/listings/rules'
import { countries } from './data/countries'
import { buildWorld } from './world'

const world = buildWorld('small')

// What a create checks of the fields it is given, as the server checks a write from the app: each field's own schema.
const issuesOf = (source: { recordSchema: () => unknown }, record: Record<string, unknown>) =>
  (source.recordSchema() as z.ZodObject).partial().safeParse(record).error?.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`)

const decimal = (value: number | null) => (value === null ? null : value.toFixed(2))

describe('the seed', () => {
  it('lists homes in every country it has data for, each in its currency', () => {
    expect(new Set(world.listings.map((listing) => listing.country))).toEqual(new Set(Object.keys(countries)))
    for (const listing of world.listings) expect(listing.currency).toBe(countries[listing.country]!.currency)
  })

  it('writes places, agencies and listings the app itself would take', () => {
    for (const [index, place] of world.places.entries()) {
      expect(issuesOf(places, { id: index + 1, name: place.name, region: place.region, country: place.country, latitude: place.latitude.toFixed(6), longitude: place.longitude.toFixed(6) }), place.name).toBeUndefined()
    }
    for (const agency of world.agencies) {
      expect(issuesOf(agencies, { name: agency.name, place_id: agency.placeId, phone: agency.phone, email: agency.email, website: agency.website }), agency.name).toBeUndefined()
    }
    for (const l of world.listings) {
      const record = {
        agency_id: l.agencyId, place_id: l.placeId, property_type: l.propertyType, status: l.status, address: l.address, postal_code: l.postalCode, currency: l.currency,
        latitude: l.latitude.toFixed(6), longitude: l.longitude.toFixed(6), purchase_price: decimal(l.purchasePrice), rent_price: decimal(l.rentPrice), living_area: l.livingArea,
        plot_area: l.plotArea, rooms: l.rooms, bedrooms: l.bedrooms, bathrooms: l.bathrooms, built_year: l.builtYear, energy_label: l.energyLabel, description: l.description,
        agent_name: l.agentName, agent_phone: l.agentPhone,
      }
      expect(issuesOf(listings, record), l.address).toBeUndefined()
      expect(listingIssues(record), l.address).toBeUndefined()
    }
  })

  it('gives every agency a web address of its own in plain Latin letters', () => {
    const sites = world.agencies.map((agency) => agency.website)
    expect(new Set(sites).size).toBe(sites.length)
    for (const site of sites) expect(site).toMatch(/^https:\/\/www\.[a-z0-9-]+-\d+\.[a-z.]+$/)
  })

  it('leaves the postal code empty only where the country has none', () => {
    for (const listing of world.listings) expect(listing.postalCode === null, listing.address).toBe(countries[listing.country]!.postal === null)
  })
})
