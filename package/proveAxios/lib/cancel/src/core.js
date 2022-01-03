import axios from 'axios';
function isFunction(val) {
    return typeof val === 'function';
}
var pendingMap = new Map();
var getPendingUrl = function (config) { return [config.method, config.url].join('&'); };
// 多次请求则取消上一次请求头
export var HEADER_KEY = 'extraCancellation';
var AxiosCanceler = /** @class */ (function () {
    function AxiosCanceler() {
    }
    /**
     * Add request
     * @param {Object} config
     */
    AxiosCanceler.prototype.addPending = function (config) {
        this.removePending(config);
        var url = getPendingUrl(config);
        config.cancelToken =
            config.cancelToken ||
                new axios.CancelToken(function (cancel) {
                    if (!pendingMap.has(url)) {
                        // If there is no current request in pending, add it
                        pendingMap.set(url, cancel);
                    }
                });
    };
    /**
     * @description: Clear all pending
     */
    AxiosCanceler.prototype.removeAllPending = function () {
        pendingMap.forEach(function (cancel) {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    };
    /**
     * Removal request
     * @param {Object} config
     */
    AxiosCanceler.prototype.removePending = function (config) {
        var url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            var cancel = pendingMap.get(url);
            cancel && cancel(url);
            pendingMap.delete(url);
        }
    };
    /**
     * @description: reset
     */
    AxiosCanceler.prototype.reset = function () {
        pendingMap = new Map();
    };
    return AxiosCanceler;
}());
export { AxiosCanceler };
//# sourceMappingURL=core.js.map