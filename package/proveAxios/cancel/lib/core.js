import axios from 'axios';
function isFunction(val) {
    return typeof val === 'function';
}
var pendingMap = new Map();
var getPendingUrl = function (config) { return [config.method, config.url].join('&'); };
export var HEADER_KEY = 'extraCancellation';
var AxiosCanceler = (function () {
    function AxiosCanceler() {
    }
    AxiosCanceler.prototype.addPending = function (config) {
        this.removePending(config);
        var url = getPendingUrl(config);
        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken(function (cancel) {
                if (!pendingMap.has(url)) {
                    pendingMap.set(url, cancel);
                }
            });
    };
    AxiosCanceler.prototype.removeAllPending = function () {
        pendingMap.forEach(function (cancel) {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    };
    AxiosCanceler.prototype.removePending = function (config) {
        var url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            var cancel = pendingMap.get(url);
            cancel && cancel(url);
            pendingMap.delete(url);
        }
    };
    AxiosCanceler.prototype.reset = function () {
        pendingMap = new Map();
    };
    return AxiosCanceler;
}());
export { AxiosCanceler };
