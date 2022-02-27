var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { dynamicModule, priority, dynamicModuleSuccessInstall, decisionInstaller, interceptorsResponseSuccess } from '@zealforchange/proveaxios';
import axios from 'axios';
const h = {
    statusExpirationCode: 401,
    refreshToken: null,
    authorizationRequired: false,
};
let UserAuthorization = class UserAuthorization {
    static res(resp) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = h.refreshToken) === null || _a === void 0 ? void 0 : _a.call(h, resp));
            const latestAuthorizationResult = yield axios(resp.config);
            return Promise.resolve(latestAuthorizationResult);
        });
    }
    static installSuc(res) {
        if (!h.authorizationRequired)
            return false;
        if (res.data.code === h.statusExpirationCode) {
            return true;
        }
        return false;
    }
};
__decorate([
    interceptorsResponseSuccess(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserAuthorization, "res", null);
__decorate([
    dynamicModuleSuccessInstall(decisionInstaller.installResSuc),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthorization, "installSuc", null);
UserAuthorization = __decorate([
    dynamicModule({ priority: priority.TOP })
], UserAuthorization);
export { UserAuthorization };
export function useUserAuthorizationHelper(conf) {
    h.statusExpirationCode = conf.statusExpirationCode;
    h.refreshToken = conf.refreshToken || null;
    h.authorizationRequired = conf.authorizationRequired;
}
