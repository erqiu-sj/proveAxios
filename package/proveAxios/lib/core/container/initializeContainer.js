var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { InitializeContainerUtils } from './InitializeContainerUtils';
var InitializeContainer = /** @class */ (function (_super) {
    __extends(InitializeContainer, _super);
    function InitializeContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.instanceList = [];
        return _this;
    }
    InitializeContainer.prototype.collect = function (List) {
        this.instanceList = this.bindingInterceptor(this.filterEmptyInterceptor(this.checkTheInstaller(this.initializationList(List))));
        return this;
    };
    InitializeContainer.prototype.checkEmptyList = function () {
        if (!this.instanceList.length)
            throw new Error('empty instance list');
    };
    InitializeContainer.prototype.get = function (index) {
        var _a;
        this.checkEmptyList();
        return (_a = this.instanceList[index]) === null || _a === void 0 ? void 0 : _a.instance;
    };
    InitializeContainer.prototype.delete = function (index) {
        this.checkEmptyList();
        return this.instanceList.splice(index, 1);
    };
    return InitializeContainer;
}(InitializeContainerUtils));
export { InitializeContainer };
//# sourceMappingURL=initializeContainer.js.map