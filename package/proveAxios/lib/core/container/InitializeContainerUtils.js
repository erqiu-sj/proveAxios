var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { interceptorsKey, decisionInstaller } from '../../types';
import { checkInterceptorCorrespondingInstaller, getDynamicPluginConfig, getLocalInstance, getModuleConfig, debuggerTips } from '../../utils';
import { Debugger } from './debugger';
export class InitializeContainerUtils extends Debugger {
    constructor(res) {
        super(res);
    }
    initializationList(List) {
        this.withDebuggerCall(() => {
            console.log(debuggerTips.initializeTheInstanceAndReadThePlugIn);
        });
        return List.map(item => {
            var _a;
            const instanceConfig = getLocalInstance(item);
            const disassembleThePlugin = ((_a = getModuleConfig(item)) === null || _a === void 0 ? void 0 : _a.priorityList.map(pluginItem => {
                return getDynamicPluginConfig(pluginItem);
            })) || [];
            return {
                instance: axios.create(instanceConfig.config),
                conf: instanceConfig,
                pluginList: disassembleThePlugin,
            };
        });
    }
    checkTheInstaller(List) {
        return List.map(item => {
            item.pluginList.map(pluginItem => {
                var _a, _b, _c, _d;
                const checkInterceptorDecorator = {
                    requestFailCb: (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb,
                    requestSuccessCb: (_b = pluginItem.interceptor) === null || _b === void 0 ? void 0 : _b.request.successCb,
                    responseSuccessCb: (_c = pluginItem.interceptor) === null || _c === void 0 ? void 0 : _c.response.successCb,
                    responseFailCb: (_d = pluginItem.interceptor) === null || _d === void 0 ? void 0 : _d.response.failCb,
                };
                const checkList = [
                    checkInterceptorDecorator.requestFailCb === undefined,
                    checkInterceptorDecorator.requestSuccessCb === undefined,
                    checkInterceptorDecorator.responseFailCb === undefined,
                    checkInterceptorDecorator.responseSuccessCb === undefined,
                ];
                const emptyInterceptor = checkList.every(checkItem => checkItem);
                if (emptyInterceptor)
                    return;
                if (!pluginItem.installer)
                    throw new Error('please check if the interception installer is bound');
                this.checkInstallerHandler(decisionInstaller.installReqSuc, pluginItem.displayName);
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestSuccessCb, pluginItem.installer.installReqSuc))
                    throw new Error('missing the corresponding request successful installer');
                this.checkInstallerHandler(decisionInstaller.installReqFail, pluginItem.displayName);
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.requestFailCb, pluginItem.installer.installReqFail))
                    throw new Error('the corresponding request failed installer is missing');
                this.checkInstallerHandler(decisionInstaller.installResSuc, pluginItem.displayName);
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseSuccessCb, pluginItem.installer.installResSuc))
                    throw new Error('the corresponding response is missing successfully installer');
                this.checkInstallerHandler(decisionInstaller.installResFail, pluginItem.displayName);
                if (!checkInterceptorCorrespondingInstaller(checkInterceptorDecorator.responseFailCb, pluginItem.installer.installResFail))
                    throw new Error('missing the corresponding response failed installer');
                return Object.assign({}, pluginItem);
            });
            return Object.assign({}, item);
        });
    }
    filterEmptyInterceptor(List) {
        return List.map((item) => {
            const requestSuccessCbList = item.pluginList
                .filter(pluginItem => {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.successCb;
            })
                .map(nextPlugin => {
                var _a;
                this.checkInterceptorHandler(interceptorsKey.interceptorsRequestSuccess, nextPlugin.displayName);
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.request.successCb;
            });
            const requestFailCbList = item.pluginList
                .filter(pluginItem => {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb;
            })
                .map(nextPlugin => {
                var _a;
                this.checkInterceptorHandler(interceptorsKey.interceptorsRequestFail, nextPlugin.displayName);
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.request.failCb;
            });
            const responseSuccessCbList = item.pluginList
                .filter(pluginItem => {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.response.successCb;
            })
                .map(nextPlugin => {
                var _a;
                this.checkInterceptorHandler(interceptorsKey.responseSuccess, nextPlugin.displayName);
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.response.successCb;
            });
            const responseFailCbList = item.pluginList
                .filter(pluginItem => {
                var _a;
                return (_a = pluginItem.interceptor) === null || _a === void 0 ? void 0 : _a.response.failCb;
            })
                .map(nextPlugin => {
                var _a;
                this.checkInterceptorHandler(interceptorsKey.responseFail, nextPlugin.displayName);
                return (_a = nextPlugin.interceptor) === null || _a === void 0 ? void 0 : _a.response.failCb;
            });
            return Object.assign({ requestSuccessCbList,
                requestFailCbList,
                responseSuccessCbList,
                responseFailCbList }, item);
        });
    }
    configBindExtraFields(instance, key, val) {
        Reflect.set(instance.defaults, key, val);
    }
    bindingInterceptor(List) {
        return List.map((item, itemIndex) => {
            item.instance.interceptors.response.use((response) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                let backupRes = null;
                for (let i = 0; i < item.responseSuccessCbList.length; i++) {
                    this.runInstallerHandler(decisionInstaller.installResSuc, item.pluginList[i].displayName);
                    if (yield ((_b = (_a = item.pluginList[i].installer) === null || _a === void 0 ? void 0 : _a.installResSuc) === null || _b === void 0 ? void 0 : _b.call(_a, backupRes || response))) {
                        this.runInterceptorHandler(interceptorsKey.responseSuccess, item.pluginList[i].displayName);
                        this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                        backupRes = yield item.responseSuccessCbList[i].call(this, backupRes || response);
                    }
                }
                return (yield ((_e = (_d = (_c = item.conf.interceptor) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.successCb) === null || _e === void 0 ? void 0 : _e.call(_d, backupRes || response))) || backupRes || response;
            }), (err) => __awaiter(this, void 0, void 0, function* () {
                var _f, _g, _h, _j, _k;
                let backupErr = null;
                for (let i = 0; i < item.responseFailCbList.length; i++) {
                    this.runInstallerHandler(decisionInstaller.installResFail, item.pluginList[i].displayName);
                    if (yield ((_g = (_f = item.pluginList[i].installer) === null || _f === void 0 ? void 0 : _f.installResFail) === null || _g === void 0 ? void 0 : _g.call(_f, backupErr || err))) {
                        this.runInterceptorHandler(interceptorsKey.responseFail, item.pluginList[i].displayName);
                        this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                        backupErr = yield item.responseFailCbList[i].call(this, backupErr || err, item.instance);
                    }
                }
                return (yield ((_k = (_h = item.conf.interceptor) === null || _h === void 0 ? void 0 : (_j = _h.response).failCb) === null || _k === void 0 ? void 0 : _k.call(_j, backupErr || err))) || backupErr || err;
            }));
            item.instance.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
                var _l, _m, _o, _p, _q;
                let backupCconfig = null;
                for (let i = 0; i < item.requestSuccessCbList.length; i++) {
                    this.runInstallerHandler(decisionInstaller.installReqSuc, item.pluginList[i].displayName);
                    if (yield ((_m = (_l = item.pluginList[i].installer) === null || _l === void 0 ? void 0 : _l.installReqSuc) === null || _m === void 0 ? void 0 : _m.call(_l, backupCconfig || config))) {
                        this.runInterceptorHandler(interceptorsKey.interceptorsRequestSuccess, item.pluginList[i].displayName);
                        this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                        backupCconfig = yield item.requestSuccessCbList[i].call(this, backupCconfig || config);
                    }
                }
                return (yield ((_q = (_o = item.conf.interceptor) === null || _o === void 0 ? void 0 : (_p = _o.request).successCb) === null || _q === void 0 ? void 0 : _q.call(_p, backupCconfig || config))) || backupCconfig || config;
            }), (err) => __awaiter(this, void 0, void 0, function* () {
                var _r, _s, _t, _u, _v;
                let backupError = null;
                for (let i = 0; i < item.requestFailCbList.length; i++) {
                    this.runInstallerHandler(decisionInstaller.installReqFail, item.pluginList[i].displayName);
                    if (yield ((_s = (_r = item.pluginList[i].installer) === null || _r === void 0 ? void 0 : _r.installReqFail) === null || _s === void 0 ? void 0 : _s.call(_r, backupError || err))) {
                        this.runInterceptorHandler(interceptorsKey.interceptorsRequestFail, item.pluginList[i].displayName);
                        this.configBindExtraFields(item.instance, 'displayName', item.pluginList[i].displayName);
                        backupError = yield item.requestFailCbList[i].call(this, backupError || err);
                    }
                }
                return (yield ((_v = (_t = item.conf.interceptor) === null || _t === void 0 ? void 0 : (_u = _t.request).failCb) === null || _v === void 0 ? void 0 : _v.call(_u, backupError || err))) || backupError || err;
            }));
            return Object.assign({}, item);
        });
    }
}
