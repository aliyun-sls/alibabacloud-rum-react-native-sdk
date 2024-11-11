"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const StringUtils_1 = require("../../util/StringUtils");
function _isReactNativeGlobal(globalScope) {
    return globalScope.ErrorUtils !== undefined;
}
exports.ErrorHandler = (OpenRUMSDK, Logger) => {
    return {
        registerErrorHandler() {
            if (global !== undefined && _isReactNativeGlobal(global)) {
                const oldHandler = global.ErrorUtils.getGlobalHandler();
                global.ErrorUtils.setGlobalHandler((error, isFatal) => {
                    this._reportErrorToOpenRUM(error, isFatal, oldHandler);
                });
                const setter = global.ErrorUtils.setGlobalHandler;
                global.ErrorUtils.setGlobalHandler = (errorHandler) => {
                    setter((error, isFatal) => {
                        this._reportErrorToOpenRUM(error, isFatal, errorHandler);
                    });
                };
            }
        },
        _reportErrorToOpenRUM(exception, isFatal, oldHandler) {
            const time = (new Date()).getTime();
            if (exception && isExceptionAnError(exception)) {
                if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(exception.name)) {
                    /*
                    *新崩溃上报接口
                    * @param bundleType Bundle类型，1为Bundle，2为路由页
                    * @param rootTag 当前路由所属bundleTag
                    * @param routeId  
                    * @param routeName 路由名称
                    * @param time 发生时间
                    * @param causeby 原因
                    * @param type 崩溃类型===isFatal
                    * @param dump 崩溃堆栈===exception.stack
                    */ 
                    const causeby=exception.message&&exception.message||'';
                    const name=exception.name&&exception.name||'';
                    const bundleType=0;
                    const rootTag=-1;
                    const routeId=0
                    const routeName=0
                    // if (isFatal === undefined) {
                    //     isFatal = false;
                    // }
                    if (exception.stack) {
                        // OpenRUMSDK.reportErrorFromHandler(evt,isFatal, String(exception.name), exception.message, exception.stack);
                        OpenRUMSDK.reportCrashBundleType(bundleType,rootTag,routeId,routeName,String(time),causeby,String(name),exception.stack)
                    }else {
                        // OpenRUMSDK.reportErrorFromHandler(evt,isFatal,String(exception.name) ,exception.message, null);
                        OpenRUMSDK.reportCrashBundleType(bundleType,rootTag,routeId,routeName,String(time),causeby,String(name),null)
                    }
                }
            }
            // else {
            //     OpenRUMSDK.reportError(String(exception), -1);
            // }
            if (oldHandler !== undefined) {
                oldHandler(exception, isFatal);
            }
        }
    };
};
function isExceptionAnError(exception) {
    return exception.message !== undefined;
}
