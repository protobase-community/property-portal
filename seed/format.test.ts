import { describe, expect, it } from 'vitest'
import { slugify } from './format'

describe('slugify', () => {
  it('spells Latin names of any language plainly, for an agency web address', () => {
    expect(slugify('Søn & Ætt Ejendomme')).toBe('son-and-aett-ejendomme')
    expect(slugify('Groß Immobilien')).toBe('gross-immobilien')
    expect(slugify('Złota Kamienica')).toBe('zlota-kamienica')
    expect(slugify('İstanbul Işık Emlak')).toBe('istanbul-isik-emlak')
    expect(slugify('Ọ̀pẹ́ Properties')).toBe('ope-properties')
    expect(slugify('Þing')).toBe('thing')
  })

  it('is empty for a name with no Latin letters, which brings its own spelling', () => {
    expect(slugify('さくら不動産')).toBe('')
  })
})
