import { pick } from '../../rng'
import { floor, housenumber, mixed, suburbs, towers, unit, type Country } from '../country'

const south = { approximate: 0.2, letWhileForSale: 0.02, energy: 'none' } as const

/** The Middle East, Africa and Oceania. */
export const southCountries: Record<string, Country> = {
  AE: {
    ...south, currency: 'AED', domain: 'ae', perM2: 14000, priceToRent: 14, forSale: 0.55, homes: towers,
    phone: { office: '+971 4 ### ####', mobile: '+971 5# ### ####' },
    postal: null,
    address: (street, rand, flat) => (flat ? `${street}، شقة ${unit(rand, 60)}` : `${street}، فيلا ${housenumber(rand)}`),
    agencies: [
      { first: [['الواحة', 'alwaha'], ['النخيل', 'alnakheel'], ['الفنار', 'alfanar']], second: [['للعقارات', 'realestate'], ['العقارية', 'property']] },
      { first: ['Marina', 'Dune', 'Pearl'], second: ['Properties', 'Real Estate'] },
    ],
    agents: [
      { first: ['مريم', 'أحمد', 'فاطمة', 'خالد', 'سعيد'], last: ['الحمادي', 'المنصوري', 'الكعبي', 'الشامسي', 'المهيري'] },
      { first: ['Priya', 'Omar', 'Hannah', 'Rafael'], last: ['Nair', 'Haddad', 'Wright', 'Santos'] },
    ],
    lines: ['قريب من المترو، إطلالة على البحر.', 'Chiller-free, with a view of the marina. 🌴'],
  },
  IL: {
    ...south, currency: 'ILS', domain: 'co.il', perM2: 32000, priceToRent: 28, forSale: 0.55, homes: mixed,
    phone: { office: '+972 3-###-####', mobile: '+972 5#-###-####' },
    postal: '{p}####',
    address: (street, rand, flat) => `${street} ${housenumber(rand)}${flat ? `, דירה ${floor(rand, 30)}` : ''}`,
    agencies: [{ first: [['נדל״ן', 'nadlan'], ['בית', 'bait'], ['נכסי', 'nichsei']], second: [['הכרמל', 'hacarmel'], ['השרון', 'hasharon'], ['ציון', 'zion'], ['הים', 'hayam']] }],
    agents: [{ first: ['נועה', 'יונתן', 'תמר', 'אורי', 'מאיה', 'עידו'], last: ['אברהמי', 'כהן', 'לוי', 'מזרחי', 'פרץ', 'ביטון'] }],
    lines: ['דירה מוארת, קרוב לים.', 'ממ״ד, מעלית וחניה.'],
  },
  MA: {
    ...south, currency: 'MAD', domain: 'ma', perM2: 11000, priceToRent: 18, forSale: 0.65, homes: mixed,
    phone: { office: '+212 522-######', mobile: '+212 6##-######' },
    postal: '{p}###',
    address: (street, rand, flat) => `${housenumber(rand)}، ${street}${flat ? `، الطابق ${floor(rand, 8)}` : ''}`,
    agencies: [
      { first: [['دار', 'dar'], ['عقارات', 'aqarat']], second: [['الأطلس', 'atlas'], ['المدينة', 'medina']] },
      { first: ['Immobilière', 'Agence'], second: ['Anfa', 'Palmeraie', 'Atlas'] },
    ],
    agents: [
      { first: ['سلمى', 'يوسف', 'خديجة', 'عمر'], last: ['العلوي', 'الإدريسي', 'بنّاني', 'التازي'] },
      { first: ['Ghita', 'Mehdi', 'Hamza', 'Yasmine'], last: ['Benjelloun', 'Tazi', 'El Fassi', 'Alaoui'] },
    ],
    lines: ['رياض تقليدي مرمم بعناية.', 'Proche du tramway et de la corniche.'],
  },
  ZA: {
    ...south, currency: 'ZAR', domain: 'co.za', perM2: 15000, priceToRent: 15, forSale: 0.65, homes: suburbs,
    phone: { office: '+27 21 ### ####', mobile: '+27 8# ### ####' },
    postal: '{p}##',
    address: (street, rand, flat) => `${flat ? `Unit ${unit(rand, 12)}, ` : ''}${housenumber(rand)} ${street}`,
    agencies: [{ first: ['Protea', 'Fynbos', 'Table Bay', 'Highveld'], second: ['Properties', 'Realty', 'Eiendomme', 'Homes'] }],
    agents: [{ first: ['Thandiwe', 'Pieter', 'Lerato', 'Sipho', 'Anri', 'Zanele'], last: ['Nkosi', 'van der Merwe', 'Dlamini', 'Botha', 'Mokoena', 'Ndlovu'] }],
    lines: ['Close to the MyCiTi bus, with a lock-up garage.'],
  },
  KE: {
    ...south, currency: 'KES', domain: 'co.ke', perM2: 140000, priceToRent: 16, forSale: 0.55, homes: mixed,
    phone: { office: '+254 20 ### ####', mobile: '+254 7## ######' },
    postal: '{p}##',
    address: (street, rand, flat) => `${flat ? `Apartment ${floor(rand, 12)}${pick(rand, ['A', 'B', 'C'])}, ` : ''}${street}`,
    agencies: [{ first: ['Savannah', 'Nyumba', 'Kilimani', 'Pwani'], second: ['Properties', 'Realtors', 'Homes'] }],
    agents: [{ first: ['Wanjiru', 'Otieno', 'Achieng', 'Kipchoge', 'Nyambura', 'Baraka'], last: ['Kamau', 'Odhiambo', 'Mwangi', 'Chebet', 'Wafula', 'Njoroge'] }],
    lines: ['Karibu! Borehole water and backup power.'],
  },
  NG: {
    ...south, currency: 'NGN', domain: 'com.ng', perM2: 900000, priceToRent: 14, forSale: 0.5, homes: mixed,
    phone: { office: '+234 1 ### ####', mobile: '+234 80# ### ####' },
    postal: '{p}###',
    address: (street, rand, flat) => `${flat ? `Flat ${floor(rand, 8)}, ` : ''}${housenumber(rand)} ${street}`,
    agencies: [{ first: ['Ọ̀pẹ́', 'Eko', 'Zuma', 'Ìrètí'], second: ['Properties', 'Realty', 'Homes & Estates'] }],
    agents: [{ first: ['Adébáyọ̀', 'Chiamaka', 'Ngozi', 'Ọlálékan', 'Aisha', 'Emeka'], last: ['Okafor', 'Adéyẹmí', 'Bello', 'Eze', 'Ọ̀ṣọ́', 'Abubakar'] }],
    lines: ['Serviced estate with 24-hour power and security.'],
  },
  AU: {
    ...south, currency: 'AUD', domain: 'com.au', perM2: 8000, priceToRent: 25, forSale: 0.6, homes: suburbs, energy: 'none',
    phone: { office: '+61 2 5550 ####', mobile: '+61 491 570 ###' },
    postal: '{p}##',
    address: (street, rand, flat) => `${flat ? `${floor(rand, 20)}/` : ''}${housenumber(rand)} ${street}`,
    agencies: [{ first: ['Wattle', 'Harbourside', 'Southern Cross', 'Banksia'], second: ['Real Estate', 'Property Group', 'Agents'] }],
    agents: [{ first: ['Chloe', 'Jack', 'Mia', 'Lachlan', 'Ngaire', 'Thanh'], last: ['Nguyen', 'Smith', 'Papadopoulos', 'Wilson', 'Kelly', 'Chen'] }],
    lines: ['North-facing, a short stroll to the beach. 🏄'],
  },
  NZ: {
    ...south, currency: 'NZD', domain: 'co.nz', perM2: 7500, priceToRent: 26, forSale: 0.6, homes: suburbs,
    phone: { office: '+64 9 ### ####', mobile: '+64 21 ### ###' },
    postal: '{p}##',
    address: (street, rand, flat) => `${flat ? `${floor(rand, 12)}/` : ''}${housenumber(rand)} ${street}`,
    agencies: [{ first: ['Kōwhai', 'Harbour', 'Pōhutukawa', 'Tūī'], second: ['Realty', 'Property', 'Real Estate'] }],
    agents: [{ first: ['Aroha', 'Tama', 'Mereana', 'Liam', 'Hēmi', 'Charlotte'], last: ['Te Whāiti', 'Ngata', 'Thompson', 'Wihongi', 'Walker', 'Parata'] }],
    lines: ['Kia ora! Sunny deck and off-street parking.'],
  },
}
