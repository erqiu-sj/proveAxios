var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { dynamicModule, priority, interceptorsRequestSuccess, dynamicModuleSuccessInstall, decisionInstaller, interceptorsResponseSuccess } from '@zealforchange/proveaxios';
import { AxiosCanceler, HEADER_KEY } from './core';
var ownAxiosCanceler = new AxiosCanceler();
var Cancel = /** @class */ (function () {
    function Cancel() {
    }
    Cancel.req = function (conf) {
        ownAxiosCanceler.addPending(conf);
        return conf;
    };
    Cancel.res = function (response) {
        response.config && ownAxiosCanceler.removePending(response.config);
        return Promise.resolve(response);
    };
    Cancel.resInstall = function (res) {
        return true;
    };
    Cancel.reqInstaller = function (conf) {
        var checkHasHeader = Reflect.has(conf.headers, 'HEADER_KEY');
        return checkHasHeader;
    };
    __decorate([
        interceptorsRequestSuccess(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Cancel, "req", null);
    __decorate([
        interceptorsResponseSuccess(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Cancel, "res", null);
    __decorate([
        dynamicModuleSuccessInstall(decisionInstaller.installResSuc),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Cancel, "resInstall", null);
    __decorate([
        dynamicModuleSuccessInstall(decisionInstaller.installReqSuc),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Cancel, "reqInstaller", null);
    Cancel = __decorate([
        dynamicModule({ priority: priority.TOP })
    ], Cancel);
    return Cancel;
}());
export { Cancel };
export { HEADER_KEY, ownAxiosCanceler };
//# sourceMappingURL=index.js.map