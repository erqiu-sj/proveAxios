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
export var executionPhase;
(function (executionPhase) {
    executionPhase["checkTheInstallerStage"] = "checkTheInstallerStage";
    executionPhase["executeTheInstallerPhase"] = "executeTheInstallerPhase";
    executionPhase["checkTheInterceptorPhase"] = "checkTheInterceptorPhase";
    executionPhase["executeTheTnterceptorPhase"] = "executeTheTnterceptorPhase";
})(executionPhase || (executionPhase = {}));
