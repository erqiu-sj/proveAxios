var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import { checkInterceptorCorrespondingInstaller, getDynamicPluginConfig, getLocalInstance, getModuleConfig } from '../../utils';
var InitializeContainerUtils = /** @class */ (function () {
    function InitializeContainerUtils() {
    }
    /**
     * @description 实例化
     * @param List
     * @returns
     */
    InitializeContainerUtils.prototype.initializationList = function (List) {
        return List.map(function (item) {
            var _a;
            var instanceConfig = getLocalInstance(item);
            var disassembleThePlugin = ((_a = getModuleConfig(item)) === null || _a === void 0 ? void 0 : _a.priorityList.map(function (pluginItem) {
                return getDynamicPluginConfig(pluginItem);
            })) || [];
            return {
                instance: axios.create(instanceConfig.config),
                conf: instanceConfig,
                pluginList: disassembleThePlugin,
            };
        });
    };
    /**
     * @description 检查安装器
     * 1. 插件有拦截器 主体没有拦截器 即插件拦截器生效
     *
     */
    InitializeContainerUtils.prototype.checkTheInstaller = function (List) {
        return List.map(function (item) {
            item.pluginList.map(function (pluginItem) {
                var _a, _b, _c, _d;
                var checkInterceptorDecorator = {
                    requestFailCb: (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb,
                    requestSuccessCb: (_b = pluginItem.interceptor) === null || _b === void 0 ? void 0 : _b.request.successCb,
                    responseSuccessCb: (_c = pluginItem.interceptor) === null || _c === void 0 ? void 0 : _c.response.successCb,
                    responseFailCb: (_d = pluginItem.interceptor) === null || _d === void 0 ? void 0 : _d.response.failCb,
                };
                var checkList = [
                    checkInterceptorDecorator.requestFailCb === undefined,
                    checkInterceptorDecorator.requestSuccessCb === undefined,
                    checkInterceptorDecorator.responseFailCb === undefined,
                    checkInterceptorDecorator.responseSuccessCb === undefined,
                ];
                var emptyInterceptor = checkList.every(function (checkItem) { return checkItem; });
                // 空拦截器器 不验证拦截安装器
                if (emptyInterceptor)
                    return;
                // 存在拦截器 验证安装器
                // 空直接报错
                if (!pluginItem.installer)
                    throw new Error('please check if the interception installer is bound');
                // 判断对应的拦截器是否有对应的安装器
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestSuccessCb, pluginItem.installer.installReqSuc))
                    throw new Error('missing the corresponding request successful installer');
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestFailCb, pluginItem.installer.installReqFail))
                    throw new Error('the corresponding request failed installer is missing');
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseSuccessCb, pluginItem.installer.installResSuc))
                    throw new Error('the corresponding response is missing successfully installer');
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseFailCb, pluginItem.installer.installResFail))
                    throw new Error('missing the corresponding response failed installer');
                return __assign({}, pluginItem);
            });
            return __assign({}, item);
        });
    };
    /**
     * @description 解析拦截器
     * @param List
     * @returns
     */
    InitializeContainerUtils.prototype.filterEmptyInterceptor = function (List) {
        return List.map(function (item) {
            var requestSuccessCbList = item.pluginList
                .filter(function (pluginItem) {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.successCb;
            })
                .map(function (nextPlugin) {
                var _a;
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.request.successCb;
            });
            var requestFailCbList = item.pluginList
                .filter(function (pluginItem) {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb;
            })
                .map(function (nextPlugin) {
                var _a;
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb;
            });
            var responseSuccessCbList = item.pluginList
                .filter(function (pluginItem) {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.response.successCb;
            })
                .map(function (nextPlugin) {
                var _a;
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.response.successCb;
            });
            var responseFailCbList = item.pluginList
                .filter(function (pluginItem) {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.response.failCb;
            })
                .map(function (nextPlugin) {
                var _a;
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.response.failCb;
            });
            return __assign({ 
                // @ts-ignore
                requestSuccessCbList: requestSuccessCbList, 
                // @ts-ignore
                requestFailCbList: requestFailCbList, 
                // @ts-ignore
                responseSuccessCbList: responseSuccessCbList, 
                // @ts-ignore
                responseFailCbList: responseFailCbList }, item);
        });
    };
    InitializeContainerUtils.prototype.configBindExtraFields = function (instance, key, val) {
        Reflect.set(instance.defaults, key, val);
    };
    /**
     * @description 绑定拦截器
     * @param List
     */
    InitializeContainerUtils.prototype.bindingInterceptor = function (List) {
        var _this = this;
        return List.map(function (item, itemIndex) {
            item.instance.interceptors.response.use(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var backupRes, i;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            backupRes = null;
                            i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(i < item.responseSuccessCbList.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, ((_b = (_a = item.pluginList[i].installer) === null || _a === void 0 ? void 0 : _a.installResSuc) === null || _b === void 0 ? void 0 : _b.call(_a, backupRes || response))];
                        case 2:
                            if (!_f.sent()) return [3 /*break*/, 4];
                            this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                            return [4 /*yield*/, item.responseSuccessCbList[i].call(this, backupRes || response)];
                        case 3:
                            backupRes = _f.sent();
                            _f.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [4 /*yield*/, ((_e = (_d = (_c = item.conf.interceptor) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.successCb) === null || _e === void 0 ? void 0 : _e.call(_d, backupRes || response))];
                        case 6: return [2 /*return*/, (_f.sent()) || backupRes || response];
                    }
                });
            }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                var backupErr, i;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            backupErr = null;
                            i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(i < item.responseFailCbList.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, ((_b = (_a = item.pluginList[i].installer) === null || _a === void 0 ? void 0 : _a.installResFail) === null || _b === void 0 ? void 0 : _b.call(_a, backupErr || err))];
                        case 2:
                            if (!_f.sent()) return [3 /*break*/, 4];
                            this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                            return [4 /*yield*/, item.responseFailCbList[i].call(this, backupErr || err, item.instance)];
                        case 3:
                            backupErr = _f.sent();
                            _f.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [4 /*yield*/, ((_e = (_c = item.conf.interceptor) === null || _c === void 0 ? void 0 : (_d = _c.response).failCb) === null || _e === void 0 ? void 0 : _e.call(_d, backupErr || err))];
                        case 6: return [2 /*return*/, (_f.sent()) || backupErr || err];
                    }
                });
            }); });
            item.instance.interceptors.request.use(function (config) { return __awaiter(_this, void 0, void 0, function () {
                var backupCconfig, i;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            backupCconfig = null;
                            i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(i < item.requestSuccessCbList.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, ((_b = (_a = item.pluginList[i].installer) === null || _a === void 0 ? void 0 : _a.installReqSuc) === null || _b === void 0 ? void 0 : _b.call(_a, backupCconfig || config))];
                        case 2:
                            if (!_f.sent()) return [3 /*break*/, 4];
                            this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                            return [4 /*yield*/, item.requestSuccessCbList[i].call(this, backupCconfig || config)];
                        case 3:
                            backupCconfig = _f.sent();
                            _f.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [4 /*yield*/, ((_e = (_c = item.conf.interceptor) === null || _c === void 0 ? void 0 : (_d = _c.request).successCb) === null || _e === void 0 ? void 0 : _e.call(_d, backupCconfig || config))];
                        case 6: return [2 /*return*/, (_f.sent()) || backupCconfig || config];
                    }
                });
            }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                var backupError, i;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            backupError = null;
                            i = 0;
                            _f.label = 1;
                        case 1:
                            if (!(i < item.requestFailCbList.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, ((_b = (_a = item.pluginList[i].installer) === null || _a === void 0 ? void 0 : _a.installReqFail) === null || _b === void 0 ? void 0 : _b.call(_a, backupError || err))];
                        case 2:
                            if (!_f.sent()) return [3 /*break*/, 4];
                            this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                            return [4 /*yield*/, item.requestFailCbList[i].call(this, backupError || err)];
                        case 3:
                            backupError = _f.sent();
                            _f.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [4 /*yield*/, ((_e = (_c = item.conf.interceptor) === null || _c === void 0 ? void 0 : (_d = _c.request).failCb) === null || _e === void 0 ? void 0 : _e.call(_d, backupError || err))];
                        case 6: return [2 /*return*/, (_f.sent()) || backupError || err];
                    }
                });
            }); });
            return __assign({}, item);
        });
    };
    return InitializeContainerUtils;
}());
export { InitializeContainerUtils };
//# sourceMappingURL=InitializeContainerUtils.js.map