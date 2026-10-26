import { pick } from '../../rng'
import { floor, housenumber, mixed, suburbs, unit, type Country } from '../country'

const americas = { approximate: 0.15, letWhileForSale: 0.02, energy: 'none' } as const

export const americasCountries: Record<string, Country> = {
  US: {
    ...americas, currency: 'USD', domain: 'com', perM2: 3200, priceToRent: 17, forSale: 0.6, homes: suburbs,
    phone: { office: '+1 (###) 555-01##', mobile: '+1 ###-555-01##' },
    postal: '{p}##',
    address: (street, rand, flat) => `${housenumber(rand) * 11} ${street}${flat ? ` ${pick(rand, ['Apt', 'Unit', '#'])} ${floor(rand, 30)}${pick(rand, ['A', 'B', 'C', 'D'])}` : ''}`,
    agencies: [{ first: ['Keystone', 'Bluebonnet', 'Liberty', 'Harbor', 'Redwood', 'Lakeshore'], second: ['Realty', 'Homes', 'Properties', 'Real Estate Group'] }],
    agents: [{ first: ['Jessica', 'Tyler', 'Maria José', 'DeShawn', 'Brianna', 'Hyun-woo', 'Kayla', 'Andrés'], last: ['Johnson', 'Rodríguez', 'Nguyen', 'Williams', 'Kowalski', 'Washington', 'Cohen', 'O’Neill'] }],
    lines: ['Walk score 92: groceries, cafés and the subway nearby. 🚇'],
  },
  CA: {
    ...americas, currency: 'CAD', domain: 'ca', perM2: 6500, priceToRent: 22, forSale: 0.6, homes: suburbs,
    phone: { office: '+1 ###-555-01##', mobile: '+1 ###-555-01##' },
    postal: '{p} #@#',
    address: (street, rand, flat) => `${flat ? `${unit(rand, 25)}-` : ''}${housenumber(rand) * 13} ${street}`,
    agencies: [{ first: ['Maple', 'Laurentide', 'Northshore', 'Beaumont'], second: ['Realty', 'Immobilier', 'Homes', 'Courtiers immobiliers'] }],
    agents: [{ first: ['Émilie', 'Liam', 'Geneviève', 'Raj', 'Chloé', 'Marc-André'], last: ['Tremblay', 'Gagnon', 'Singh', 'Côté', 'Bouchard', 'MacDonald'] }],
    lines: ['À deux pas du métro, cour arrière ensoleillée.'],
  },
  MX: {
    ...americas, currency: 'MXN', domain: 'com.mx', perM2: 28000, priceToRent: 17, forSale: 0.6, homes: mixed,
    phone: { office: '+52 55 #### ####', mobile: '+52 1 55 #### ####' },
    postal: '{p}##',
    address: (street, rand, flat) => `${street} ${housenumber(rand)}${flat ? `, Depto. ${unit(rand, 10)}` : ''}`,
    agencies: [{ first: ['Bienes Raíces', 'Inmobiliaria', 'Casas'], second: ['Roma Norte', 'Coyoacán', 'Jalisco', 'Del Valle', 'Xochimilco'] }],
    agents: [{ first: ['José Ángel', 'Guadalupe', 'Ximena', 'Itzel', 'Héctor', 'Citlali'], last: ['Hernández', 'García', 'Ramírez', 'Núñez', 'Xolotl', 'Sánchez'] }],
    lines: ['A dos cuadras del Parque México.'],
  },
  BR: {
    ...americas, currency: 'BRL', domain: 'com.br', perM2: 8000, priceToRent: 20, forSale: 0.6, homes: mixed,
    phone: { office: '+55 11 ####-####', mobile: '+55 11 9####-####' },
    postal: '{p}##-###',
    address: (street, rand, flat) => `${street}, ${housenumber(rand) * 9}${flat ? `, apto ${unit(rand, 20)}` : ''}`,
    agencies: [{ first: ['Imobiliária', 'Imóveis', 'Lar'], second: ['Paulista', 'Ipanema', 'Ibirapuera', 'Copacabana', 'Pinheiros'] }],
    agents: [{ first: ['João Pedro', 'Ana Luíza', 'Maria Eduarda', 'Luís Otávio', 'Thaís', 'Caio'], last: ['Gonçalves', 'Araújo', 'da Silva', 'Conceição', 'Magalhães', 'Assunção'] }],
    lines: ['Perto do metrô, varanda gourmet.'],
  },
  AR: {
    // Homes in Argentina are priced in US dollars, sales and rents alike.
    ...americas, currency: 'USD', domain: 'com.ar', perM2: 2200, priceToRent: 18, forSale: 0.65, homes: mixed,
    phone: { office: '+54 11 ####-####', mobile: '+54 9 11 ####-####' },
    postal: '{p}####@@@',
    address: (street, rand, flat) => `${street} ${housenumber(rand) * 8}${flat ? `, ${floor(rand, 14)}º ${pick(rand, ['A', 'B', 'C', 'D'])}` : ''}`,
    agencies: [{ first: ['Propiedades', 'Inmobiliaria'], second: ['Palermo', 'San Telmo', 'Recoleta', 'Río de la Plata', 'Güemes'] }],
    agents: [{ first: ['Martín', 'Sofía', 'Agustín', 'Valentina', 'Joaquín', 'Florencia'], last: ['Fernández', 'González', 'Rodríguez', 'Pérez', 'Gómez', 'Ibáñez'] }],
    lines: ['Luminoso, con balcón a la calle arbolada.'],
  },
}
