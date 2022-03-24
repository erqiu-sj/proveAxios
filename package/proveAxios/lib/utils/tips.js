export function onlyListenForAPluginCall(ops) {
    if ((ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly) && (ops === null || ops === void 0 ? void 0 : ops.isDebugPlugInNameOnly) && ((ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly) === ops.displayName)) {
        console.log(ops.tips);
        return true;
    }
    return false;
}
export function checkInstaller(dispayName, ops) {
    if (onlyListenForAPluginCall(Object.assign(Object.assign({ displayName: dispayName }, ops), { tips: `checking the installer(${ops === null || ops === void 0 ? void 0 : ops.installType}) for the ${ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly}  (${getTime()})` }))) {
        return;
    }
    if (!dispayName) {
        console.log(`checking the installer(${ops === null || ops === void 0 ? void 0 : ops.installType}) (${getTime()})`);
        return;
    }
    console.log(`checking the installer(${ops === null || ops === void 0 ? void 0 : ops.installType}) for the ${dispayName} (${getTime()})`);
    return;
}
export function checkInterceptor(dispayName, ops) {
    if (onlyListenForAPluginCall(Object.assign(Object.assign({ tips: `checking the interceptor(${ops === null || ops === void 0 ? void 0 : ops.interceptorType}) for the ${ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly} (${getTime()})` }, ops), { displayName: dispayName }))) {
        return;
    }
    if (!dispayName) {
        console.log(`checking the interceptor(${ops === null || ops === void 0 ? void 0 : ops.interceptorType}) (${getTime()})`);
        return;
    }
    console.log(`checking the interceptor(${ops === null || ops === void 0 ? void 0 : ops.interceptorType}) for the ${dispayName}  (${getTime()})`);
    return;
}
export function monitorInstallerExecution(displayName, ops) {
    if (onlyListenForAPluginCall(Object.assign(Object.assign({}, ops), { tips: `(${ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly})installer is executing (${getTime()})`, displayName: displayName }))) {
        return;
    }
    if (!displayName) {
        console.log(`runing the installer(${ops === null || ops === void 0 ? void 0 : ops.installerType}) (${getTime()})`);
        return;
    }
    console.log(`runing the installer(${ops === null || ops === void 0 ? void 0 : ops.installerType}) for the ${displayName} (${getTime()})`);
    return;
}
export function monitorPluginInterceptorExecution(displayName, ops) {
    if (onlyListenForAPluginCall(Object.assign(Object.assign({}, ops), { tips: `(${ops === null || ops === void 0 ? void 0 : ops.debugPlugInNameOnly})Interceptor is executing (${getTime()})`, displayName: displayName }))) {
        return;
    }
    if (!displayName) {
        console.log(`runing the interceptor(${ops === null || ops === void 0 ? void 0 : ops.interceptorType}) (${getTime()})`);
        return;
    }
    console.log(`runing the interceptor(${ops === null || ops === void 0 ? void 0 : ops.interceptorType}) for the ${displayName} (${getTime()})`);
    return;
}
function getTime() {
    const time = new Date();
    return `\n ${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}  ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}
