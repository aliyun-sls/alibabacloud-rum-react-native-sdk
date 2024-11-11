"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRUMSDK = void 0;
const OpenRUMBridge_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/OpenRUMBridge");
const Logger_1 = require("@OpenRUM/react-native-plugin/lib/util/Logger");
exports.OpenRUMSDK = {
    viewNameArr:[],
    routeId:"-1",
    rootTag:-1,
    changRootTag:function(data){
        this.rootTag=data
    },
    enterAction(name, platform) {
        Logger_1.Logger.logDebug(`---enterAction---data--: ${name}`);
    },
    /**
     * 事件数据 目前只有点击事件数据
     * @param evt 事件触发时间戳
     * @param actionName 事件点击源的文本名称
     * @param stayTime 事件执行耗时
     * @param touchType 事件类型
     * @param eventProps 事件触发源标签对象
     */
    onActionEvent(evt,actionName,stayTime,touchType,eventProps) {
        const viewName = this.viewNameArr[this.viewNameArr.length-1]||'App';
        this.reportActionToBridge(evt,touchType,eventProps,actionName,viewName,stayTime);
        Logger_1.Logger.logDebug(`---onActionEvent---${evt} ---viewName:${viewName} ---action: ${actionName} ---loadTime:${stayTime} ---targetName:${eventProps}`);

    },
    reportActionToBridge(evt, type, name, info, viewName, stayTime){
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.reportAction != undefined){
            OpenRUMBridge_1.OpenRUMNative.reportAction(String(evt),type,name,info,viewName,stayTime);
        }
    },
    /**
     * /崩溃接口
     * @param evt 发生时间
     * @param isFatal 是否致命错误
     * @param errorName 错误类型（名称）
     * @param reason 错误原因
     * @param stacktrace 错误堆栈
     */
    reportErrorFromHandler(evt, isFatal, errorName, reason, stacktrace) {
        this.reportCrashToBridge(evt,reason,errorName,stacktrace);
        Logger_1.Logger.logDebug("---reportErrorFromHandler---Error isFatal =" + isFatal+ "; message =" +errorName +":" + reason);
    },
    reportCrashToBridge(evt,reason,errorName,stacktrace){
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.reportCrash != undefined){
            OpenRUMBridge_1.OpenRUMNative.reportCrash(String(evt),reason, errorName, stacktrace);
        }
    },
    /**
     * 视图数据接口
     * @param evt 开始渲染事件戳
     * @param viewId 组件id
     * @param viewName 组件名称
     * @param loadTime 渲染完成耗时
     * @param model 执行类型，1进入，2退出
     * @param funcName 当前执行方法名称
     */
    reportViewEvent(evt,viewId,viewName,loadTime,model,funcName,route){
        if(model==1&&route){
            this.routeId=route
        }else{
            route=this.routeId
        }
        this.reportViewToBridge(evt,viewId,loadTime,model,viewName,funcName,route,this.rootTag);
        Logger_1.Logger.logDebug("---reportViewEvent---model("+model+")---typeFunc: " + funcName + ";evt="+evt +";loadtime="+loadTime +";viewName="+viewName + ";viewId="+viewId+";routeId"+route+";rootTag"+this.rootTag);
    },
    reportViewToBridge(evt,viewId,loadTime,model,name,funcName,routeId){
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.reportView != undefined){
            OpenRUMBridge_1.OpenRUMNative.reportView(String(evt),viewId,loadTime,model,name,funcName,String(routeId),this.rootTag);
        }
    },
    onViewEvent(name) {
        Logger_1.Logger.logDebug("---onViewEvent---message: " + name);
    },
    setOrUpdateViewName(viewName){
        //根据当前渲染的组件名称更新viewName名称
        this.viewNameArr.push(viewName);
        Logger_1.Logger.logDebug("---setOrUpdateViewName---message---add Element: " + viewName);
    },
    removeViewName(){
        //根据当前渲染的组件名称更新viewName名称
        this.viewNameArr = [];
        Logger_1.Logger.logDebug("---removeViewName---message---reset Element");
    },
    /**配置接口*/
    /**
    * 设置启动接口
    * @param appID string  
    */  
    startWithAppID(appID){
        Logger_1.Logger.logDebug("---startWithAppID---appID: " + appID);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.startWithAppID != undefined){
            OpenRUMBridge_1.OpenRUMNative.startWithAppID(appID);
        }
    },
    /** 
    * 设置config地址
    * @param configAddress string
    */  
    setConfigAddress(configAddress){
        Logger_1.Logger.logDebug("---setConfigAddress---configAddress: " + configAddress);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setConfigAddress != undefined){
            OpenRUMBridge_1.OpenRUMNative.setConfigAddress(configAddress);
        }
    },
    /** 
     * 设置app版本
     * @param  appVersion string
     */
    setAppVersion(appVersion){
        Logger_1.Logger.logDebug("---setAppVersion---appVersion: " + appVersion);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setAppVersion != undefined){
            OpenRUMBridge_1.OpenRUMNative.setAppVersion(appVersion);
        }
    },
    /**
    * 设置渠道id
    * @param channelID string
    * */ 
    setChannelID(channelID){
        Logger_1.Logger.logDebug("---setChannelID---channelID: " + channelID);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setChannelID != undefined){
            OpenRUMBridge_1.OpenRUMNative.setChannelID(channelID);
        }
    },
    /**
     * 设置自定义设备id
     * @param deviceID string
     */
    setDeviceID(deviceID){
        Logger_1.Logger.logDebug("---setDeviceID---deviceID: " + deviceID);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setDeviceID != undefined){
            OpenRUMBridge_1.OpenRUMNative.setDeviceID(deviceID);
        }
    },
    /**
     * 设置持续丢帧时间
     * @param time number
     * 
     */
    setDropFrameTime(time){
        Logger_1.Logger.logDebug("---setDropFrameTime---time: " + time);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setDropFrameTime != undefined){
            OpenRUMBridge_1.OpenRUMNative.setDropFrameTime(time);
        }
    },
    /**
     * 设置mPasS框架使用状态
     * @param used boolean
     */ 
     useMpaas(used){
        Logger_1.Logger.logDebug("---useMpaas---used: " + used);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.useMpaas != undefined){
            OpenRUMBridge_1.OpenRUMNative.useMpaas(used);
        }
    },
    /**
     * 设置自定义请求头中自定义业务字段
     * @param headerArr array
     */  
    setCustomBusinessHeaders(headerArr){
        Logger_1.Logger.logDebug("---setCustomBusinessHeaders---headerArr: " + headerArr);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomBusinessHeaders != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomBusinessHeaders(headerArr);
        } 
    },
    /**
     * 自定义冷启动开始
     * @param used boolean
     */
    useCustomLaunch(used){
        Logger_1.Logger.logDebug("---useCustomLaunch---used: " + used);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.useCustomLaunch != undefined){
            OpenRUMBridge_1.OpenRUMNative.useCustomLaunch(used);
        } 
    },
    /**
     * 自定义冷启动结束
     */
    recordCustomLaunchEnd(){
        Logger_1.Logger.logDebug("---recordCustomLaunchEnd---");
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.recordCustomLaunchEnd != undefined){
            OpenRUMBridge_1.OpenRUMNative.recordCustomLaunchEnd();
        } 
    },
    /**
     *设置SDK自身请求头Header 
     * @param  headers Map
     */
    setSDKRequestHeaders(headers){
        Logger_1.Logger.logDebug("---setSDKRequestHeaders---headers: " + headers);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setSDKRequestHeaders != undefined){
            OpenRUMBridge_1.OpenRUMNative.setSDKRequestHeaders(headers);
        } 
    },
    /* 以下是获取接口 */
    /**
     * 获取deviceID
     */
    async getDeviceID(){
        let deviceID=null
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.deviceID != undefined){
            deviceID=await OpenRUMBridge_1.OpenRUMNative.deviceID();
        }
        Logger_1.Logger.logDebug("---getDeviceID---deviceID:"+deviceID);
        return deviceID 
    },
    /**
     * 获取版本信息
     */
    async getSDKVersion(){
        let SDKVersion=null;
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.sdkVersion != undefined){
            SDKVersion=await OpenRUMBridge_1.OpenRUMNative.sdkVersion();
        }
        Logger_1.Logger.logDebug("---getSDKVersion---SDKVersion:"+SDKVersion);
        return SDKVersion 
    },
    /**  以下为自定义数据接口**/
    /**
     * 设置用户id接口
     * @param userName string
     */
    setUserName(userName){
        Logger_1.Logger.logDebug("---setUserID---userName: " + userName);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setUserName != undefined){
            OpenRUMBridge_1.OpenRUMNative.setUserName(userName);
        }
    },
    /**
     * 设置用户附加信息
     * @param userInfo map
     */
    setUserExtraInfo(userInfo){
        if (userInfo instanceof Map){
          let obj = {};
          for (let [k, v] of userInfo) {
            obj[k] = v;
          }
          userInfo = obj;
        }
        Logger_1.Logger.logDebug("---setExtraInfo---userInfo: " + userInfo);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setUserExtraInfo != undefined){
            OpenRUMBridge_1.OpenRUMNative.setUserExtraInfo(userInfo);
        }
    },
    /**
     * 用户自定义视图-开始标记
     * @param pageName 视图名称 (用于视图匹配，请保证唯一性)
     * @param pageAlias 视图别名
     */
    setCustomPageStart(pageName,pageAlias){
        Logger_1.Logger.logDebug("---setCustomPageStart---pageName: " + pageName +" ---pageAlias:"+pageAlias);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomPageStart != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomPageStart(pageName,pageAlias);
        }
    },
    /**
     * 用户自定义视图-结束标记
     * @param pageName 视图名称 (用于视图匹配，请保证唯一性)
     * @param pageAlias 视图别名
     */
    setCustomPageEnd(pageName,pageAlias){
        Logger_1.Logger.logDebug("---setCustomPageEnd---pageName: " + pageName +" ---pageAlias:"+pageAlias);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomPageEnd != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomPageEnd(pageName,pageAlias);
        }
    },
    /**
     * 自定义异常收集
     * @param exceptionType 异常类型
     * @param causedBy 异常原因
     * @param errorDump 异常堆栈
     */
    setCustomException(exceptionType,causedBy,errorDump){
        Logger_1.Logger.logDebug("---setCustomException---exceptionType:" + exceptionType +" ---causedBy:"+causedBy +" ---errorDump:"+errorDump);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomException != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomException(exceptionType,causedBy,errorDump);
        }
    },
    /**
     *
     * @param metricName 指标名称
     * @param metricValue 指标值（整型）
     * @param param 指标附加信息
     */
    setCustomMetric(metricName,metricValue,param){
        Logger_1.Logger.logDebug("---setCustomMetric---metricName:" + metricName +" ---metricValue:"+metricValue +" ---param:"+param);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomMetric != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomMetric(metricName,metricValue,param);
        }
    },
    /**
     * 自定义日志
     * @param logInfo 日志信息
     * @param param 日志附加信息
     */
    setCustomLog(logInfo, name, snapshots, level, attributes){
        Logger_1.Logger.logDebug("---setCustomLog---logInfo:" + logInfo 
            +" ---name:"+name
            +" ---snapshots:"+snapshots
            +" ---level:"+level
            +" ---attributes:"+attributes);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomLog != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomLog(logInfo,name, snapshots, level, attributes);
        }
    },
    /**
     * 自定义事件
     * @param eventId 事件ID
     * @param eventName 事件名称
     * @param param 事件附加信息
     */
    setCustomEvent(name, group, snapshots, value, attributes){
        Logger_1.Logger.logDebug("---setCustomEvent---eventName:" + name 
            + "---group:" + group 
            + "---snapshots:" + snapshots 
            + " ---value:" + value 
            + "---attributes:" + attributes);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomEvent != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomEvent(name, group, snapshots, value, attributes);
        }
    },
    /**
     * 自定义事件开始
     * @param eventId
     * @param eventName
     * @param eventLabel
     * @param param
     */ 
    setCustomEventStart(eventId, eventName,eventLabel, param,info){
        Logger_1.Logger.logDebug("---setCustomEventStart---eventId:" + eventId +" ---eventName:"+eventName +"---eventLabel:"+eventLabel+" ---param:"+param+"---info"+info);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomEventStart != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomEventStart(eventId, eventName,eventLabel, param,info);
        }
    },
    /**
     * 自定义事件结束
     * @param eventId
     * @param eventName
     * @param eventLabel
     * @param param
     */ 
    setCustomEventEnd(eventId, eventName,eventLabel, param,info){
        Logger_1.Logger.logDebug("---setCustomEventEnd---eventId:" + eventId +" ---eventName:"+eventName +"---eventLabel:"+eventLabel+" ---param:"+param+"---info"+info);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomEventEnd != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomEventEnd(eventId, eventName,eventLabel, param,info);
        }
    },
    /**
     * 自定义方法开始
     * @param methodName
     * @param param
     */
    setCustomMethodStart(methodName,param){
        Logger_1.Logger.logDebug("---setCustomMethodStart---methodName:" + methodName +" ---param:"+param);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomMethodStart != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomMethodStart(methodName,param);
        }
    },
    /**
     * 自定义方法结束
     * @param methodName
     * @param param
     */
    setCustomMethodEnd(methodName,param){
        Logger_1.Logger.logDebug("---setCustomMethodEnd---methodName:" + methodName +" ---param:"+param);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomMethodEnd != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomMethodEnd(methodName,param);
        }
    },
    /**
     * 自定义网络
     * @param networkModel
     */ 
    setCustomNetwork(networkModel){
        Logger_1.Logger.logDebug("---setCustomNetwork---networkModel:"+JSON.stringify(networkModel));
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setCustomNetwork != undefined){
            OpenRUMBridge_1.OpenRUMNative.setCustomNetwork(networkModel);
        }
    },
    /**
     * 设置自定义请求接口信息
     * @param headerKey
     * @param value 
     * @param info
     */ 
     setRequestExtraInfo(headerKey,value,info){
        Logger_1.Logger.logDebug("---setRequestExtraInfo---headerKey:"+headerKey+"---value:"+value+"---info:"+info);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setRequestExtraInfo != undefined){
            OpenRUMBridge_1.OpenRUMNative.setRequestExtraInfo(headerKey,value,info);
        }
    },
    /*
    * 自定义bundle开始加载接口
    * @param  bundleName
    */
    bundleStartLoad(bundleName){
        Logger_1.Logger.logDebug("---bundleStartLoad---bundleName:"+bundleName);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.bundleStartLoad != undefined){
            OpenRUMBridge_1.OpenRUMNative.bundleStartLoad(bundleName);
        }
    },
    bundleFinishLoad(bundleName){
        Logger_1.Logger.logDebug("---bundleFinishLoad---bundleName:"+bundleName);
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.bundleFinishLoad != undefined){
            OpenRUMBridge_1.OpenRUMNative.bundleFinishLoad(bundleName);
        } 
    },
    /*
    *新崩溃上报接口
    * @param bundleType Bundle类型，1为Bundle，2为路由页
    * @param rootTag 当前路由所属bundleTag
    * @param routeId  
    * @param routeName 路由名称
    * @param time 发生时间
    * @param causeby 原因
    * @param type 崩溃类型
    * @param dump 崩溃堆栈
    */ 
    reportCrashBundleType(bundleType,root,routeId,routeName,time,causeby,name,dump){
        Logger_1.Logger.logDebug("---reportCrashBundleType---start:");
        const stack = new Error().stack;
        Logger_1.Logger.logDebug("---reportCrashBundleType---stack:"+stack);
        const viewName = this.viewNameArr[this.viewNameArr.length-1];
        if(viewName==this.viewNameArr[0]){
            bundleType=1
        }else{
            bundleType=2
        }
        routeId=routeId||this.routeId
        routeName=routeName||viewName
        const rootTag=this.rootTag
        if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.reportCrashBundleType != undefined){
            Logger_1.Logger.logDebug("---reportCrashBundleType---" + OpenRUMBridge_1.OpenRUMNative.reportCrashBundleType);
            OpenRUMBridge_1.OpenRUMNative.reportCrashBundleType(bundleType,rootTag,String(routeId),routeName,time,causeby,name,dump)
        } 
        Logger_1.Logger.logDebug("---reportCrashBundleType---bundleType:"+bundleType+"---rootTag:"+rootTag+"---routeId:"+routeId+"---routeName:"+routeName+"---time:"+time+"---causeby:"+causeby+"---name:"+name+"---dump:"+dump);
    }
    /**
     * 设置在线调试功能授权
     * @param isAuthorized
     */ 
    // authorizeOnlineTracking(isAuthorized){
    //     Logger_1.Logger.logDebug("---authorizeOnlineTracking---isAuthorized:"+isAuthorized);
    //     if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.authorizeOnlineTracking != undefined){
    //         OpenRUMBridge_1.OpenRUMNative.authorizeOnlineTracking(isAuthorized);
    //     }
    // },
    /**
     * 设置在线调试回调函数
     * @param callback function
     */ 
    // setOnlineTrackingAuthorizationCallback(callback){
    //     Logger_1.Logger.logDebug("---setOnlineTrackingAuthorizationCallback---callback:"+callback);
    //     if(OpenRUMBridge_1.OpenRUMNative && OpenRUMBridge_1.OpenRUMNative.setOnlineTrackingAuthorizationCallback != undefined){
    //         OpenRUMBridge_1.OpenRUMNative.setOnlineTrackingAuthorizationCallback(callback);
    //     }
    // }
};
