export class RegexPart {
  private readonly _source: string

  static of(source: string): RegexPart {
    return new RegexPart(source)
  }

  private constructor(part: string) {
    this._source = part
  }

  get source(): string {
    return this._source
  }

  toRegExp(flags?: string): RegExp {
    return new RegExp(this._source, flags)
  }
}

export const raw = (str: string): RegexPart => RegexPart.of(str)

export const escape = (str: string): RegexPart =>
  raw(str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))

export const nonCapturingGroup = (part: RegexPart): RegexPart =>
  raw(`(?:${part.source})`)

export const capturingGroup = (part: RegexPart): RegexPart =>
  raw(`(${part.source})`)

export const oneOrMore = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}+`)

export const zeroOrMore = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}*`)

export const anyOf = (...parts: RegexPart[]): RegexPart =>
  nonCapturingGroup(raw(`${parts.map((part) => part.source).join('|')}`))

export const sequence = (...parts: RegexPart[]): RegexPart =>
  raw(parts.map((part) => part.source).join(''))

export const optional = (part: RegexPart): RegexPart =>
  raw(`${nonCapturingGroup(part).source}?`)

export const times = (part: RegexPart, min: number, max?: number): RegexPart =>
  raw(`${nonCapturingGroup(part).source}{${min},${max ?? ''}}`)

export const ANYTHING = raw('.')

export const NOTHING = raw('')

export const WORD_BOUNDARY = raw('\\b')

export const BASE64 = raw(
  '[A-Za-z0-9+/=]',
)
