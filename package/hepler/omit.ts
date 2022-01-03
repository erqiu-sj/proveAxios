import omit from 'lodash.omit'

export function cleanExtraConfiguration<T extends object>(config: T, keys: string[]): T {
    return omit(config, keys) as T
}