import { InitializeContainerUtils } from './InitializeContainerUtils';
export class InitializeContainer extends InitializeContainerUtils {
    constructor(res) {
        super(res);
        this.instanceList = [];
    }
    collect(List) {
        this.instanceList = this.bindingInterceptor(this.filterEmptyInterceptor(this.checkTheInstaller(this.initializationList(List))));
        return this;
    }
    checkEmptyList() {
        if (!this.instanceList.length)
            throw new Error('empty instance list');
    }
    get(index) {
        var _a;
        this.checkEmptyList();
        return (_a = this.instanceList[index]) === null || _a === void 0 ? void 0 : _a.instance;
    }
    delete(index) {
        this.checkEmptyList();
        return this.instanceList.splice(index, 1);
    }
}
