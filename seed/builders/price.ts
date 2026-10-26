/** A price as an agency would ask it, to three figures: 452,000, 2,140 or 14,400,000,000. */
export const roundPrice = (amount: number) => {
  const step = 10 ** Math.max(0, Math.floor(Math.log10(amount)) - 2)
  return Math.round(amount / step) * step
}
