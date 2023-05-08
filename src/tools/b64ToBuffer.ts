export const b64ToBuffer = (b64string: string) =>
  Uint8Array.from(atob(b64string), (c) => c.charCodeAt(0))
