import { describe, expect, it } from 'vitest'
import { roundPrice } from './price'

describe('roundPrice', () => {
  it('keeps three figures, whatever the currency', () => {
    expect(roundPrice(452_317)).toBe(452_000)
    expect(roundPrice(2_137.4)).toBe(2_140)
    expect(roundPrice(14_437_000_000)).toBe(14_400_000_000)
    expect(roundPrice(87.6)).toBe(88)
  })
})
