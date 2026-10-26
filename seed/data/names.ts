/** The opening line of a description, by property type. */
export const openings: Record<string, readonly string[]> = {
  apartment: ['A bright apartment', 'A well-kept apartment', 'A spacious flat', 'A light apartment with high ceilings'],
  house: ['A family home', 'A detached house', 'A semi-detached house', 'A comfortable family house'],
  townhouse: ['A characterful townhouse', 'A terraced house', 'A narrow canal-side townhouse', 'A renovated townhouse'],
  villa: ['A modern villa', 'A villa with a pool', 'A light-filled villa', 'A quiet villa'],
  studio: ['A compact studio', 'A smart studio', 'A studio close to everything'],
  penthouse: ['A penthouse with views', 'A top-floor penthouse', 'A penthouse with a roof terrace'],
}

/** Further sentences a description may use, each about one thing. */
export const details = {
  garden: 'The garden faces south and gets the sun all afternoon.',
  balcony: 'The balcony is large enough for a table and four chairs.',
  parking: 'A parking space comes with the home.',
  renovated: 'The kitchen and bathroom were renewed recently.',
  transport: 'Shops, schools and the station are within walking distance.',
  quiet: 'It lies in a quiet street, close to a park.',
  original: 'Original details such as the stairs and ceilings have been kept.',
  insulated: 'Well insulated, with double glazing and solar panels.',
} as const
