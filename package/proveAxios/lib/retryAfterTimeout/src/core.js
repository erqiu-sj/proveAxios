var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Axios from 'axios';
export class RetryCore {
    constructor(conf, instance) {
        this.conf = conf;
    }
    checkField({ message, field }) {
        var _a;
        const conf = this.conf;
        if (!((_a = conf === null || conf === void 0 ? void 0 : conf.config) === null || _a === void 0 ? void 0 : _a[field]))
            throw new Error(message);
        return this;
    }
    runCallBack(cbKey, payload) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            this.checkNumberOfRetries();
            const checkedConf = this.conf;
            if (!((_a = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _a === void 0 ? void 0 : _a[cbKey]))
                return this;
            yield ((_c = (_b = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _b === void 0 ? void 0 : _b[cbKey]) === null || _c === void 0 ? void 0 : _c.call(_b, payload));
            return this;
        });
    }
    retryBeforeCbCb() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.checkNumberOfRetries();
            const checkedConf = this.conf;
            if (!((_a = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _a === void 0 ? void 0 : _a['retryBeforeCb']))
                return this;
            if ((_b = this === null || this === void 0 ? void 0 : this.conf) === null || _b === void 0 ? void 0 : _b.config) {
                const conf = yield ((_d = (_c = checkedConf === null || checkedConf === void 0 ? void 0 : checkedConf.config) === null || _c === void 0 ? void 0 : _c['retryBeforeCb']) === null || _d === void 0 ? void 0 : _d.call(_c, checkedConf.config));
                this.setConf(conf);
                return this;
            }
            return this;
        });
    }
    setConf(params) {
        if (!this.conf)
            throw new Error('the configuration cannot be empty');
        this.conf.config = params;
    }
    retrying() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const conf = this.conf;
            const returnVal = [];
            for (let index = 0; index < ((_a = conf.config) === null || _a === void 0 ? void 0 : _a.numberOfRetries); index++) {
                const result = yield Promise.allSettled([Axios(Object.assign({}, conf.config))]);
                if (result[0].status === 'rejected') {
                    continue;
                }
                returnVal.push(result[0].value);
                break;
            }
            return returnVal[0];
        });
    }
    checkNumberOfRetries() {
        this.checkField({ field: 'numberOfRetries', message: "to retry numberOfRetries is required" });
    }
}
