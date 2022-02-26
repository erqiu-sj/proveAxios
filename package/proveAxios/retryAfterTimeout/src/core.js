"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryCore = void 0;
var axios_1 = __importDefault(require("axios"));
var RetryCore = /** @class */ (function () {
    function RetryCore(conf, instance) {
        this.conf = conf;
    }
    RetryCore.prototype.checkField = function (_a) {
        var _b;
        var message = _a.message, field = _a.field;
        var conf = this.conf;
        if (!((_b = conf === null || conf === void 0 ? void 0 : conf.config) === null || _b === void 0 ? void 0 : _b[field]))
            throw new Error(message);
        return this;
    };
    RetryCore.prototype.runCallBack = function (cbKey, payload) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var checkedConf;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.checkNumberOfRetries();
                        checkedConf = this.conf;
                        if (!((_a = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _a === void 0 ? void 0 : _a[cbKey]))
                            return [2 /*return*/, this];
                        return [4 /*yield*/, ((_c = (_b = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _b === void 0 ? void 0 : _b[cbKey]) === null || _c === void 0 ? void 0 : _c.call(_b, payload))];
                    case 1:
                        _d.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    RetryCore.prototype.retryBeforeCbCb = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var checkedConf, conf;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.checkNumberOfRetries();
                        checkedConf = this.conf;
                        if (!((_a = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _a === void 0 ? void 0 : _a['retryBeforeCb']))
                            return [2 /*return*/, this];
                        if (!((_b = this === null || this === void 0 ? void 0 : this.conf) === null || _b === void 0 ? void 0 : _b.config)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_d = (_c = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _c === void 0 ? void 0 : _c['retryBeforeCb']) === null || _d === void 0 ? void 0 : _d.call(_c, checkedConf.config))];
                    case 1:
                        conf = _e.sent();
                        this.setConf(conf);
                        return [2 /*return*/, this];
                    case 2: return [2 /*return*/, this];
                }
            });
        });
    };
    RetryCore.prototype.setConf = function (params) {
        if (!this.conf)
            throw new Error('the configuration cannot be empty');
        this.conf.config = params;
    };
    RetryCore.prototype.retrying = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var conf, returnVal, index, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        conf = this.conf;
                        returnVal = [];
                        index = 0;
                        _b.label = 1;
                    case 1:
                        if (!(index < ((_a = conf.config) === null || _a === void 0 ? void 0 : _a.numberOfRetries))) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.allSettled([axios_1.default(__assign({}, conf.config))])];
                    case 2:
                        result = _b.sent();
                        if (result[0].status === 'rejected') {
                            return [3 /*break*/, 3];
                        }
                        returnVal.push(result[0].value);
                        return [3 /*break*/, 4];
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, returnVal[0]];
                }
            });
        });
    };
    RetryCore.prototype.checkNumberOfRetries = function () {
        this.checkField({ field: 'numberOfRetries', message: "to retry numberOfRetries is required" });
    };
    return RetryCore;
}());
exports.RetryCore = RetryCore;
