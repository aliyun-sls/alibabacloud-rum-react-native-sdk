"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRUM = void 0;
const OpenRUMSDK = require("./OpenRUMSDK");
let current = null;
let currentKey = null;
exports.OpenRUM = {
  /**
   * 启动接口
   * @param appID 
   */ 
   startWithAppID(appID){
    OpenRUMSDK.OpenRUMSDK.startWithAppID(appID);
   },
  /**
  * 设置config请求地址
  * @param configAddress
  */ 
  setConfigAddress(configAddress){
    OpenRUMSDK.OpenRUMSDK.setConfigAddress(configAddress);
  }, 
  /**
   * 设置app版本  
   *  @param appVersion 
   */
  setAppVersion(appVersion){
    OpenRUMSDK.OpenRUMSDK.setAppVersion(appVersion);
  },
  /**
   * 设置渠道id
   * @param channelID string
   * */ 
  setChannelID(channelID){
    OpenRUMSDK.OpenRUMSDK.setChannelID(channelID);
  },
  /**
   * 设置自定义设备id
   * @param deviceID string
  */
  setDeviceID(deviceID){
    OpenRUMSDK.OpenRUMSDK.setDeviceID(deviceID);
  },
  /**
   * 设置持续丢帧时间
   * @param time number
   * */
  setDropFrameTime(time){
    OpenRUMSDK.OpenRUMSDK.setDropFrameTime(time);
  },
  /**
   * 设置mPaaS框架使用状态
   * @param used boolean
   */ 
  useMpaas(used){
    OpenRUMSDK.OpenRUMSDK.useMpaas(used);
  },
  /**
   * 设置自定义请求头中自定义业务字段
   * @param headerArr array
   */  
  setCustomBusinessHeaders(headerArr){
    OpenRUMSDK.OpenRUMSDK.setCustomBusinessHeaders(headerArr);
  },
  /**
   * 自定义冷启动开始
   * @param used boolean
   */
  useCustomLaunch(used){
    OpenRUMSDK.OpenRUMSDK.useCustomLaunch(used);
  },
  /**
   * 自定义冷启动结束
   */
  recordCustomLaunchEnd(){
    OpenRUMSDK.OpenRUMSDK.recordCustomLaunchEnd();
  },
  /**
   * 设置SDK自身请求头Header
   * @param  headers Map
   */
  setSDKRequestHeaders(headers){
    OpenRUMSDK.OpenRUMSDK.setSDKRequestHeaders(headers);
  },
  /*数据获取接口*/
  /**
   * 获取设备ID
   */  
  getDeviceID(){
    return OpenRUMSDK.OpenRUMSDK.getDeviceID();
  },
  /**
   *  获取SDK版本
   */ 
  getSDKVersion(){
    return OpenRUMSDK.OpenRUMSDK.getSDKVersion();
  },
  /**
   * 
   */  
  /**
    * 设置用户名称接口
    * @param {string} userName 用户名称
    */
  setUserName(userName) {
    OpenRUMSDK.OpenRUMSDK.setUserName(userName);
  },
  /**
   * 设置用户附加信息
   * @param {Object} userInfo 用户附件信息
   */
  setUserExtraInfo(userInfo) {
    OpenRUMSDK.OpenRUMSDK.setUserExtraInfo(userInfo);
  },
  /**
   * 用户自定义视图-开始标记
   * @param pageName 视图名称 (用于视图匹配，请保证唯一性)
   * @param pageAlias 视图别名
   */
  setCustomPageStart(pageName, pageAlias) {
    OpenRUMSDK.OpenRUMSDK.setCustomPageStart(pageName, pageAlias);
  },
  /**
   * 用户自定义视图-结束标记
   * @param pageName 视图名称 (用于视图匹配，请保证唯一性)
   * @param pageAlias 视图别名
   */
  setCustomPageEnd(pageName, pageAlias) {
    OpenRUMSDK.OpenRUMSDK.setCustomPageEnd(pageName, pageAlias);
  },
  /**
   * 自定义异常收集
   * @param exceptionType 异常类型
   * @param causedBy 异常原因
   * @param errorDump 异常堆栈
   */
  setCustomException(exceptionType, causedBy, errorDump) {
    OpenRUMSDK.OpenRUMSDK.setCustomException(exceptionType, causedBy, errorDump);
  },
  /**
   *
   * @param metricName 指标名称
   * @param metricValue 指标值（整型）
   * @param param 指标附加信息
   */
  setCustomMetric(metricName, metricValue, param) {
    OpenRUMSDK.OpenRUMSDK.setCustomMetric(metricName, metricValue, param);
  },
  /**
   * 自定义日志
   * @param logInfo 日志信息
   * @param param 日志附加信息
   */
  setCustomLog(logInfo, {name, snapshots, level = INFO, attributes = {}}) {
    OpenRUMSDK.OpenRUMSDK.setCustomLog(logInfo, name, snapshots, level, attributes);
  },
  /**
   * 自定义事件
   * @param {string} name 事件名称(必选)
   * @param {string} group 事件分组(可选)
   * @param {string} snapshots 事件快照(可选)
   * @param {number} value 事件值(可选)
   * @param {Object} attributes 事件附加信息(可选)
   */
  setCustomEvent(name, {group, snapshots, value = 0, attributes = {}} = {}) {
    OpenRUMSDK.OpenRUMSDK.setCustomEvent(name, group, snapshots, value, attributes);
  },
  /**
   * 自定义事件开始
   * @param eventId
   * @param eventName
   * @param eventLabel
   * @param param
   */ 
  setCustomEventStart(eventId, eventName,eventLabel, param,info) {
    OpenRUMSDK.OpenRUMSDK.setCustomEventStart(eventId, eventName,eventLabel, param,info);
  },
  /**
   * 自定义事件结束
   * @param eventId
   * @param eventName
   * @param eventLabel
   * @param param
   */ 
  setCustomEventEnd(eventId, eventName,eventLabel, param,info) {
    OpenRUMSDK.OpenRUMSDK.setCustomEventEnd(eventId, eventName,eventLabel, param,info);
  },
  /**
   * 自定义方法开始
   * @param methodName
   * @param param
   */
  setCustomMethodStart(methodName,param){
    OpenRUMSDK.OpenRUMSDK.setCustomMethodStart(methodName,param)
  },
  /**
   * 自定义方法结束
   * @param methodName
   * @param param
   */
  setCustomMethodEnd(methodName,param){
    OpenRUMSDK.OpenRUMSDK.setCustomMethodEnd(methodName,param)
  },
  /**
   * 自定义网络
   * @param networkModel
   */ 
  setCustomNetwork(networkModel){
    OpenRUMSDK.OpenRUMSDK.setCustomNetwork(networkModel)
  },
  /**
   * 设置自定义请求接口信息
   * @param headerKey
   * @param value 
   * @param info
   */ 
  setRequestExtraInfo(headerKey,value,info){
    OpenRUMSDK.OpenRUMSDK.setRequestExtraInfo(headerKey,value,info)
  },
  /*
  * 自定义bundle开始加载接口
  * @param  bundleName   STRING
  */
  bundleStartLoad(bundleName){
    OpenRUMSDK.OpenRUMSDK.bundleStartLoad(bundleName)
  },
  bundleFinishLoad(bundleName){
    OpenRUMSDK.OpenRUMSDK.bundleFinishLoad(bundleName)
  },
  /*
  *新崩溃上报接口
  * @param time 发生时间
  * @param causeby 原因
  * @param type 崩溃类型
  * @param dump 崩溃堆栈
  * @param bundleType Bundle类型，1为Bundle，2为路由页
  * @param bundleName bundle名称
  * @param anchorID RN事件关联ID
  * @param routeName 路由名称
  */ 
  reportCrashBundleType(bundleType,rootTag,routeId,routeName,time,causeby,type,dump){
    OpenRUMSDK.OpenRUMSDK.reportCrashBundleType(bundleType,rootTag,routeId,routeName,time,causeby,type,dump)
  },
  /**
   * 设置在线调试功能授权
   * @param isAuthorized
   */ 
  // authorizeOnlineTracking(isAuthorized){
  //   OpenRUMSDK.OpenRUMSDK.authorizeOnlineTracking(isAuthorized)
  // },
  /**
   * 设置在线调试回调函数
   * @param callback function
   */ 
  // setOnlineTrackingAuthorizationCallback(callback){
  //   OpenRUMSDK.OpenRUMSDK.setOnlineTrackingAuthorizationCallback(callback)
  // },
  /**
  * 路由监听对外暴露接口 6版本
  */
   reportRouterData(targ) {
    let model = 1;
    let time = (new Date()).getTime();
    let newPage = targ.getCurrentRoute().name;
    if (current == null) {
      // 第一次进入路由
      current = newPage;
      currentKey = buildViewID();
      OpenRUMSDK.OpenRUMSDK.reportViewEvent(time,currentKey,newPage,1000,1,"reportRouterData()")
    } else {
      // 非第一次进入路由
      OpenRUMSDK.OpenRUMSDK.reportViewEvent(time, currentKey, current, 1000, 2, "reportRouterData")
      current = newPage;
      currentKey = buildViewID();
      OpenRUMSDK.OpenRUMSDK.reportViewEvent(time,currentKey,newPage,1000,1,"reportRouterData()")
    }
  },
  reportRouterDataV5(navigationRef) {
    const state = navigationRef.current?.getRootState();
    if(state){
      reportData(state)
    }
    navigationRef.current?.addListener('state', (e) => {
      reportData(e.data.state)
    });
    function reportData(data){
      let model = 1;
      let time = (new Date()).getTime();
      let num=data['index'];
  
      let newPage = data["routes"][num]['name'];
      if (current == null) {
        // 第一次进入路由
        current = newPage;
        currentKey = buildViewID();
        OpenRUMSDK.OpenRUMSDK.reportViewEvent(time,currentKey,newPage,1000,1,"reportRouterData")
      } else {
        // 非第一次进入路由
        OpenRUMSDK.OpenRUMSDK.reportViewEvent(time, currentKey, current, 1000, 2, "reportRouterData")
        current = newPage;
        currentKey = buildViewID();
        OpenRUMSDK.OpenRUMSDK.reportViewEvent(time,currentKey,newPage,1000,1,"reportRouterData")
      }
    }

  },
  // 兼容react-navigation 2.10.0版本的路由数据;
  reportRouterDataV2(preState,newState,action){
    let time =(new Date()).getTime();
    if(currentKey===null){
      currentKey=buildViewID();
    }
    if(!preState.isTransitioning){
      let prePageName=preState&&preState.routes[preState["index"]]['routeName'];
      OpenRUMSDK.OpenRUMSDK.reportViewEvent(time, currentKey, prePageName, 1000, 2, "reportRouterData")
    }
    if(newState.isTransitioning){
      let newPage=newState&&newState.routes[newState["index"]]['routeName'];
      currentKey = buildViewID();
      OpenRUMSDK.OpenRUMSDK.reportViewEvent(time,currentKey,newPage,1000,1,"reportRouterData")
    }
  }
}

function buildViewID(){
  return Date.now().toString(36);// 最大进制支持转为36进制，使用字符是0-9a-z;
}