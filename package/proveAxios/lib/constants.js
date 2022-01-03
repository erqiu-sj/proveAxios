// 局部实例
export var PARTIAL_INSTANCE = Symbol('partialInstance');
// 动态插件
export var DYNAMIC_PLUGIN = Symbol('dynamicPlugin');
// 拦截器
export var INTERCEPTOR = Symbol('interceptor');
// 模块配置
export var MODULE_CONFIGURATION = Symbol('moduleConfiguration');
export var iNSTALLER = Symbol('Installer');
// 优先级
export var priority;
(function (priority) {
    priority["LOWEST"] = "LOWEST";
    priority["INTERMEDIATE"] = "INTERMEDIATE";
    priority["TOP"] = "TOP";
})(priority || (priority = {}));
export var instanceAlias;
(function (instanceAlias) {
    instanceAlias[instanceAlias["firstInstance"] = 0] = "firstInstance";
    instanceAlias[instanceAlias["secondInstance"] = 1] = "secondInstance";
    instanceAlias[instanceAlias["thirdInstance"] = 2] = "thirdInstance";
    instanceAlias[instanceAlias["fourthInstance"] = 3] = "fourthInstance";
    instanceAlias[instanceAlias["fifthInstance"] = 4] = "fifthInstance";
    instanceAlias[instanceAlias["sixthInstance"] = 5] = "sixthInstance";
})(instanceAlias || (instanceAlias = {}));
//# sourceMappingURL=constants.js.map