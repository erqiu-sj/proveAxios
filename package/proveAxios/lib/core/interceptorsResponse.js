"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptorsResponseFail = exports.interceptorsResponseSuccess = void 0;
require("reflect-metadata");
var types_1 = require("../types");
var utils_1 = require("../utils");
function interceptorsResponseSuccess() {
    return function (target, key, desc) {
        (0, utils_1.createInterceptorsKey)(target, desc.value, types_1.interceptorsKey.responseSuccess);
        return desc;
    };
}
exports.interceptorsResponseSuccess = interceptorsResponseSuccess;
function interceptorsResponseFail() {
    return function (target, key, desc) {
        (0, utils_1.createInterceptorsKey)(target, desc.value, types_1.interceptorsKey.responseFail);
        return desc;
    };
}
exports.interceptorsResponseFail = interceptorsResponseFail;
//# sourceMappingURL=interceptorsResponse.js.map