"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRUMNative = void 0;
const react_native_1 = require("react-native");
const openrumRNBridge = {
  reportAction:function(){},
  reportCrash:function(){},
  reportView:function(){},
  setUserName:function(){},
  setUserExtraInfo:function(){},
  setCustomPageStart:function(){},
  setCustomPageEnd:function(){},
  setCustomException:function(){},
  setCustomMetric:function(){},
  setCustomLog:function(){},
  setCustomEvent:function(){},
  recordCustomLaunchEnd: function () { },
  reportRouterData: function () { },
  startWithAppID:function(){},
  setConfigAddress:function(){},
  setAppVersion:function(){},
  setChannelID:function(){},
  setDeviceID:function(){},
  setDropFrameTime:function(){},
  useMpaas:function(){},
  setCustomBusinessHeaders:function(){},
  useCustomLaunch:function(){},
  setSDKRequestHeaders:function(){},
  deviceID:function(){},
  sdkVersion:function(){},
  setCustomEventStart:function(){},
  setCustomEventEnd:function(){},
  setCustomMethodStart:function(){},
  setCustomMethodEnd:function(){},
  setCustomNetwork:function(){},
  setRequestExtraInfo:function(){},
  bundleStartLoad:function(){},
  bundleFinishLoad:function(){},
  reportCrashBundleType:function(){}
}
exports.OpenRUMNative = react_native_1.NativeModules.openrumRNBridge || openrumRNBridge;
