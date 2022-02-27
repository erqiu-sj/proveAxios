export function Singleton(fn) {
    let result = null;
    return function () {
        return result ? result : (result = fn());
    };
}
