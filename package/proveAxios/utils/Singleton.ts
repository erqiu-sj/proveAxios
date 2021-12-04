export function Singleton<T>(fn: () => T): () => T {
  let result: null | T = null
  return function () {
    return result ? result : (result = fn())
  }
}
