export const bufferToB64 = (arrayBuffer: Iterable<number>) =>
  btoa(
    String.fromCharCode(...new Uint8Array(arrayBuffer)),
  ).replaceAll('=', '')
