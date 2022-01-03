export function Singleton(fn) {
    var result = null;
    return function () {
        return result ? result : (result = fn());
    };
}
//# sourceMappingURL=Singleton.js.map