"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceAlias = exports.priority = exports.iNSTALLER = exports.MODULE_CONFIGURATION = exports.INTERCEPTOR = exports.DYNAMIC_PLUGIN = exports.PARTIAL_INSTANCE = void 0;
// 局部实例
exports.PARTIAL_INSTANCE = Symbol('partialInstance');
// 动态插件
exports.DYNAMIC_PLUGIN = Symbol('dynamicPlugin');
// 拦截器
exports.INTERCEPTOR = Symbol('interceptor');
// 模块配置
exports.MODULE_CONFIGURATION = Symbol('moduleConfiguration');
exports.iNSTALLER = Symbol('Installer');
// 优先级
var priority;
(function (priority) {
    priority["LOWEST"] = "LOWEST";
    priority["INTERMEDIATE"] = "INTERMEDIATE";
    priority["TOP"] = "TOP";
})(priority = exports.priority || (exports.priority = {}));
var instanceAlias;
(function (instanceAlias) {
    instanceAlias[instanceAlias["firstInstance"] = 0] = "firstInstance";
    instanceAlias[instanceAlias["secondInstance"] = 1] = "secondInstance";
    instanceAlias[instanceAlias["thirdInstance"] = 2] = "thirdInstance";
    instanceAlias[instanceAlias["fourthInstance"] = 3] = "fourthInstance";
    instanceAlias[instanceAlias["fifthInstance"] = 4] = "fifthInstance";
    instanceAlias[instanceAlias["sixthInstance"] = 5] = "sixthInstance";
})(instanceAlias = exports.instanceAlias || (exports.instanceAlias = {}));
//# sourceMappingURL=constants.js.map