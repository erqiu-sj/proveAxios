"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptorsRequestFail = exports.interceptorsRequestSuccess = void 0;
require("reflect-metadata");
var types_1 = require("../types");
var utils_1 = require("../utils");
function interceptorsRequestSuccess() {
    return function (target, key, desc) {
        (0, utils_1.createInterceptorsKey)(target, desc.value, types_1.interceptorsKey.interceptorsRequestSuccess);
        return desc;
    };
}
exports.interceptorsRequestSuccess = interceptorsRequestSuccess;
function interceptorsRequestFail() {
    return function (target, key, desc) {
        (0, utils_1.createInterceptorsKey)(target, desc.value, types_1.interceptorsKey.interceptorsRequestFail);
        return desc;
    };
}
exports.interceptorsRequestFail = interceptorsRequestFail;
//# sourceMappingURL=interceptorsRequest.js.map