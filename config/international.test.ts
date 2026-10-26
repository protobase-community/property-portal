import { describe, expect, it } from 'vitest'
import type { z } from 'zod'
import { agencies, listings, places } from './index'
import { listingIssues } from './listings/rules'

// What a create checks of the fields it is given, as the server checks a write: each field's own schema.
const writable = (source: { recordSchema: () => unknown }) => (source.recordSchema() as z.ZodObject).partial()
const issuesOf = (source: { recordSchema: () => unknown }, record: Record<string, unknown>) =>
  writable(source).safeParse(record).error?.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`)

// Homes as agencies around the world write them: their scripts, postal codes or none, phone numbers and currencies.
const homes = [
  { address: 'Þingholtsstræti 27', postal_code: '101', currency: 'ISK', purchase_price: '89500000.00', agent_name: 'Guðrún Þórisdóttir', agent_phone: '+354 862 4417' },
  { address: 'ул. „Витоша“ 18, ет. 3, ап. 7', postal_code: '1000', currency: 'EUR', rent_price: '1150.00', agent_name: 'Десислава Колева', agent_phone: '+359 88 412 7730' },
  { address: 'Οδός Ερμού 42', postal_code: '105 63', currency: 'EUR', purchase_price: '385000.00', agent_name: 'Αικατερίνη Παπαδοπούλου', agent_phone: '+30 694 512 8830' },
  { address: 'شارع الشيخ زايد، 214', postal_code: null, currency: 'AED', purchase_price: '1450000.00', agent_name: 'مريم الحمادي', agent_phone: '+971 50 418 2276' },
  { address: 'רחוב דיזנגוף 120, דירה 4', postal_code: '6433222', currency: 'ILS', rent_price: '9800.00', agent_name: 'נועה אברהמי', agent_phone: '+972 52-614-8803' },
  { address: '渋谷区神宮前3丁目14-7 702号室', postal_code: '150-0001', currency: 'JPY', rent_price: '185000.00', agent_name: '渡辺 美咲', agent_phone: '+81 90-4127-5583' },
  { address: '마포구 월드컵로 112, 1203호', postal_code: '03965', currency: 'KRW', purchase_price: '1150000000.00', agent_name: '김서연', agent_phone: '+82 10-4821-7735' },
  { address: 'फ्लैट 1202, 14, लोखंडवाला रोड', postal_code: '400053', currency: 'INR', purchase_price: '23500000.00', agent_name: 'प्रिया शर्मा', agent_phone: '+91 98201 44718' },
  { address: '88 ถนนสุขุมวิท ห้อง 1504', postal_code: '10110', currency: 'THB', rent_price: '42000.00', agent_name: 'สมชาย ศรีสุข', agent_phone: '+66 81 234 5678' },
  { address: 'Số 27 Phố Hàng Bạc, Căn hộ 502', postal_code: '11000', currency: 'VND', purchase_price: '14400000000.00', agent_name: 'Nguyễn Thị Thu Hằng', agent_phone: '+84 912 345 678' },
  { address: 'Av. Corrientes 1847, 6º B', postal_code: 'C1045AAD', currency: 'USD', purchase_price: '168000.00', agent_name: 'Martín Fernández', agent_phone: '+54 9 11 4417-2290' },
  { address: 'Flat 3, 41 Marchmont Road', postal_code: 'EH9 1HY', currency: 'GBP', rent_price: '1450.00', agent_name: "Siobhán O'Connor-Mac Lochlainn", agent_phone: '+44 7700 900417' },
  { address: '1600 Ponsonby Road', postal_code: '1011', currency: 'NZD', purchase_price: '1385000.00', agent_name: 'Aroha Te Whāiti', agent_phone: '+64 21 456 789' },
  { address: 'İstiklal Caddesi No: 112 D: 5', postal_code: '34433', currency: 'TRY', rent_price: '38500.00', agent_name: 'Çağla Öztürk', agent_phone: '+90 532 418 7720' },
  { address: 'Calle Durango 214, Depto. 302 🌳', postal_code: '06700', currency: 'MXN', purchase_price: '5350000.00', agent_name: 'José Ángel Hernández', agent_phone: '+52 55 1234 5678' },
]

describe('international data', () => {
  it.each(homes)('takes a listing at $address', (home) => {
    const listing = { ...home, place_id: 1, agency_id: 1, property_type: 'apartment', latitude: '35.669800', longitude: '139.709900', living_area: 72, rooms: 3, bedrooms: 2, description: 'A bright apartment.' }
    expect(issuesOf(listings, listing)).toBeUndefined()
    expect(listingIssues(listing)).toBeUndefined()
  })

  it('takes a home of every age a city still lives in', () => {
    expect(issuesOf(listings, { built_year: 1347 })).toBeUndefined()
  })

  it('takes places in any country, by name in their own script', () => {
    for (const place of [{ name: 'Reykjavík', region: 'Höfuðborgarsvæðið', country: 'IS' }, { name: 'دبي', region: 'إمارة دبي', country: 'AE' }, { name: '東京', region: '東京都', country: 'JP' }]) {
      expect(issuesOf(places, { ...place, latitude: '64.146600', longitude: '-21.942600' })).toBeUndefined()
    }
  })

  it('takes agencies with their own phone numbers and addresses in other scripts', () => {
    const agency = { name: 'Ŝtefan & Søn Ejendomme København', place_id: 1, phone: '+45 33 12 34 56', email: 'kontakt@søn-ejendomme.dk', website: 'https://www.søn-ejendomme.dk' }
    expect(issuesOf(agencies, agency)).toBeUndefined()
  })

  it('still refuses what is not a country or currency code', () => {
    expect(issuesOf(places, { country: 'Japan' })).toHaveLength(1)
    expect(issuesOf(listings, { currency: '€' })).toHaveLength(1)
  })
})
