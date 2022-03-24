export const PARTIAL_INSTANCE = Symbol('partialInstance');
export const DYNAMIC_PLUGIN = Symbol('dynamicPlugin');
export const INTERCEPTOR = Symbol('interceptor');
export const MODULE_CONFIGURATION = Symbol('moduleConfiguration');
export const iNSTALLER = Symbol('Installer');
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
