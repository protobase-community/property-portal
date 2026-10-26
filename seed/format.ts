const escapes: Record<string, string> = { '\\': '\\\\', '\t': '\\t', '\n': '\\n', '\r': '\\r' }

const cell = (value: unknown) => {
  if (value === null || value === undefined) return '\\N'
  return String(value).replace(/[\\\t\n\r]/g, (char) => escapes[char]!)
}

// One COPY text-format row.
export const row = (...values: unknown[]) => values.map(cell).join('\t') + '\n'

export const iso = (ms: number) => new Date(ms).toISOString()

// Latin letters that no accent strips down to a plain one.
const plain: Record<string, string> = { ß: 'ss', æ: 'ae', ø: 'o', œ: 'oe', þ: 'th', ð: 'd', ł: 'l', đ: 'd', ı: 'i', ŀ: 'l' }

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ßæøœþðłđıŀ]/g, (char) => plain[char]!)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
