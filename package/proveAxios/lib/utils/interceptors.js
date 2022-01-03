export function getInterceptorsKey(target, type) {
    return Reflect.getMetadata(type, target);
}
export function createInterceptorsKey(target, func, type) {
    Reflect.defineMetadata(type, func, target);
}
//# sourceMappingURL=interceptors.js.map