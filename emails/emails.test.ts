import { describe, expect, it } from 'vitest'
import type { AlertedListing } from './alerted-listing'
import { prices } from './alerted-listing'
import { dailyDigest } from './daily-digest'
import { instantAlert } from './instant-alert'

const app = { name: 'Property portal', url: 'https://portal.example.com/' }
const canalFlat = { name: 'Canal flat', url: 'https://portal.example.com/saved_searches/3' }
const flat: AlertedListing = { address: 'Keizersgracht 123-2', place: 'Amsterdam', currency: 'EUR', purchasePrice: '650000.00', rentPrice: null, livingArea: 92, url: 'https://portal.example.com/listings/42', searches: [canalFlat] }
const piso: AlertedListing = {
  address: 'Calle de Serrano, 45', place: 'Madrid', currency: 'EUR', purchasePrice: null, rentPrice: '2100.00', livingArea: 80, url: 'https://portal.example.com/listings/7',
  searches: [{ name: 'Madrid centro', url: 'https://portal.example.com/saved_searches/5' }],
}
const searchesUrl = 'https://portal.example.com/saved_searches'
// Homes in other scripts and currencies: right-to-left Arabic and Hebrew, Japanese, and a search named with an emoji.
const dubai: AlertedListing = {
  address: 'شارع الشيخ زايد، 214', place: 'دبي', currency: 'AED', purchasePrice: '1450000.00', rentPrice: null, livingArea: 96, url: 'https://portal.example.com/listings/8',
  searches: [{ name: 'شقة في دبي 🌴', url: 'https://portal.example.com/saved_searches/6' }],
}
const tokyo: AlertedListing = { ...dubai, address: '渋谷区神宮前3丁目14-7 702号室', place: '東京', currency: 'JPY', purchasePrice: null, rentPrice: '185000.00', livingArea: 41 }
const telAviv: AlertedListing = { ...dubai, address: 'רחוב דיזנגוף 120, דירה 4', place: 'תל אביב-יפו', currency: 'ILS', purchasePrice: '4650000.00', rentPrice: '9800.00' }

describe('the instant alert', () => {
  it('names the one listing, with its price, size, search and link', async () => {
    const email = await instantAlert.render({ app, listings: [flat], searchesUrl })
    expect(email.subject).toBe('New: Keizersgracht 123-2, Amsterdam')
    expect(email.html).toContain('href="https://portal.example.com/listings/42"')
    expect(email.text).toContain('For sale: €650,000, 92 m²')
    expect(email.text).toContain('Fits "Canal flat" https://portal.example.com/saved_searches/3')
    expect(email.text).toContain(searchesUrl)
    expect(email.text).toContain('Property portal https://portal.example.com/')
  })

  it('names every search a listing fits once, one saved without a name as one of theirs', async () => {
    const both = { ...flat, searches: [canalFlat, { name: null, url: 'https://portal.example.com/saved_searches/9' }] }
    const email = await instantAlert.render({ app, listings: [both], searchesUrl })
    expect(email.text).toContain('Fits "Canal flat" https://portal.example.com/saved_searches/3 and one of your searches https://portal.example.com/saved_searches/9')
    expect(email.text.match(/Keizersgracht 123-2/g)).toHaveLength(1)
  })

  it('counts the listings when several came at once', async () => {
    expect((await instantAlert.render({ app, listings: [flat, piso], searchesUrl })).subject).toBe('2 new homes fit your searches')
  })
})

describe('the daily digest', () => {
  it('counts the listings of the day, and gives a rent per month', async () => {
    const email = await dailyDigest.render({ app, listings: [flat, piso], searchesUrl })
    expect(email.subject).toBe('2 new homes fit your searches')
    expect(email.text).toContain('These homes were published since your last digest')
    expect(email.text).toContain('For rent: €2,100 a month, 80 m²')
    expect((await dailyDigest.render({ app, listings: [piso], searchesUrl })).subject).toBe('1 new home fits your searches')
  })
})

describe('prices', () => {
  it('gives both prices of a home offered both ways', () => {
    expect(prices({ currency: 'EUR', purchasePrice: '650000.00', rentPrice: '2450.00' })).toBe('For sale: €650,000 or for rent: €2,450 a month')
  })

  it("writes each price in the listing's own currency, whole", () => {
    expect(prices(tokyo)).toBe('For rent: ¥185,000 a month')
    expect(prices(telAviv)).toBe('For sale: ₪4,650,000 or for rent: ₪9,800 a month')
    expect(prices({ currency: 'VND', purchasePrice: '14400000000.00', rentPrice: null })).toBe('For sale: ₫14,400,000,000')
    expect(prices({ currency: 'INR', purchasePrice: '23500000.00', rentPrice: null })).toBe('For sale: ₹23,500,000')
    expect(prices({ currency: 'GBP', purchasePrice: '725000.00', rentPrice: null })).toBe('For sale: £725,000')
  })
})

describe('a home in another script', () => {
  it('keeps its address, place and search name whole in the subject and the text', async () => {
    const email = await instantAlert.render({ app, listings: [dubai], searchesUrl })
    expect(email.subject).toBe('New: شارع الشيخ زايد، 214, دبي')
    // A no-break space keeps the code with its amount.
    expect(email.text).toContain('For sale: AED\u00a01,450,000, 96 m²')
    expect(email.text).toContain('Fits "شقة في دبي 🌴"')
    const digest = await dailyDigest.render({ app, listings: [tokyo, telAviv], searchesUrl })
    expect(digest.text).toContain('渋谷区神宮前3丁目14-7 702号室, 東京')
    expect(digest.text).toContain('רחוב דיזנגוף 120, דירה 4, תל אביב-יפו')
    expect(digest.html).toContain('渋谷区神宮前3丁目14-7 702号室')
  })
})
