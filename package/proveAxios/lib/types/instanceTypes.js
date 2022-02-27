export var interceptorsKey;
(function (interceptorsKey) {
    interceptorsKey["interceptorsRequestSuccess"] = "interceptorsRequestSuccess";
    interceptorsKey["interceptorsRequestFail"] = "interceptorsRequestFail";
    interceptorsKey["responseSuccess"] = "responseSuccess";
    interceptorsKey["responseFail"] = "responseFail";
})(interceptorsKey || (interceptorsKey = {}));
export var decisionInstaller;
(function (decisionInstaller) {
    decisionInstaller["installReqSuc"] = "installReqSuc";
    decisionInstaller["installReqFail"] = "installReqFail";
    decisionInstaller["installResSuc"] = "installResSuc";
    decisionInstaller["installResFail"] = "installResFail";
})(decisionInstaller || (decisionInstaller = {}));
// 执行阶段
export var executionPhase;
(function (executionPhase) {
    // 检查安装器阶段
    executionPhase["checkTheInstallerStage"] = "checkTheInstallerStage";
    executionPhase["executeTheInstallerPhase"] = "executeTheInstallerPhase";
    executionPhase["checkTheInterceptorPhase"] = "checkTheInterceptorPhase";
    executionPhase["executeTheTnterceptorPhase"] = "executeTheTnterceptorPhase"; // 执行拦截器阶段
})(executionPhase || (executionPhase = {}));
