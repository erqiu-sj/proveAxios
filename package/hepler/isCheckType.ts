
export function isObject(check: unknown): boolean {
    return toString.call(check) === '[object Object]'
}

export function hasCheckProperty(obj: object, key: string): boolean {
    return Reflect.has(obj, key)
}