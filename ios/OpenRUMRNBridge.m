#import "OpenRUMRNBridge.h"
#import <OpenRUM/OpenRUM.h>
#import <OpenCore/OpenCore.h>
#import <React/RCTRootView.h>

@import AlibabaCloudRUM;
@implementation OpenRUMRNBridge

RCT_EXPORT_MODULE(openrumRNBridge);

RCT_EXPORT_METHOD(startWithAppID:(NSString *)appID)
{
    [OpenRUM startWithAppID:appID];
}

RCT_EXPORT_METHOD(setConfigAddress:(NSString *)configAddress)
{
    [OpenRUM setConfigAddress:configAddress];
}

RCT_EXPORT_METHOD(setAppVersion:(NSString *)appVersion)
{
    [OpenRUM setAppVersion:appVersion];
}

RCT_EXPORT_METHOD(setChannelID:(NSString *)channelID)
{
    [OpenRUM setChannelID:channelID];
}

RCT_EXPORT_METHOD(setDeviceID:(NSString *)deviceID)
{
    [OpenRUM setDeviceID:deviceID];
}

RCT_REMAP_METHOD(deviceID,
                 deviceIDWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *deviceId = [OpenRUM deviceID];
    if (resolve) {
        resolve(deviceId);
    }
}

RCT_REMAP_METHOD(sdkVersion,
                 sdkVersionWithResolver: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *sdkVersion = [OpenRUM SDKVersion];
    if (resolve) {
        resolve(sdkVersion);
    }
}

RCT_EXPORT_METHOD(setUserName:(nullable NSString *)userName)
{
  [AlibabaCloudRUM setUserName:userName];
}

RCT_EXPORT_METHOD(setUserExtraInfo:(nullable NSDictionary<NSString *,id> *)extraInfo)
{
  [AlibabaCloudRUM setUserExtraInfo:extraInfo];
}


RCT_EXPORT_METHOD(setDropFrameTime:(NSInteger)time)
{
    [OpenRUM setDropFrameTime:time];
}

RCT_EXPORT_METHOD(useCustomLaunch:(BOOL)used)
{
    [OpenRUM useCustomLaunch:used];
}

RCT_EXPORT_METHOD(recordCustomLaunchEnd)
{
    [OpenRUM recordCustomLaunchEnd];
}

/// 自定义指标
/// @param metricName 指标名称
/// @param metricValue 指标值（整型）
/// @param param 指标附加信息
RCT_EXPORT_METHOD(setCustomMetric:(NSString *)metricName
                  metricValue:(NSInteger)metricValue
                  param:(nullable NSString *)param)
{
    [OpenRUM setCustomMetricWithName:metricName value:metricValue param:param];
}

/// 自定义日志
/// @param logInfo 日志信息
/// @param param 日志附加信息
RCT_EXPORT_METHOD(setCustomLog:(NSString *)logInfo name:(nullable NSString *)name snapshots:(nullable NSString *)snapshots level:(nullable NSString *)level attributes:(nullable NSDictionary<NSString *,id> *)attributes)
{
  [AlibabaCloudRUM setCustomLog:logInfo name:name snapshots:snapshots level:level info:attributes];
}

RCT_REMAP_METHOD(setCustomEvent,
                 name:(nullable NSString *)name
                 group:(nullable NSString *)group
                 snapshots:(nullable NSString *)snapshots
                 value:(nonnull NSNumber *)value
                 attributes:(nullable NSDictionary *)attributes)
{
  [AlibabaCloudRUM setCustomEvent:name group:group snapshots:snapshots value:value.doubleValue info:attributes];
}

RCT_REMAP_METHOD(setCustomEventStart,
                 setCustomEventStartWithID:(NSString *)eventID
                 name:(nullable NSString *)eventName
                 label:(nullable NSString *)eventLabel
                 param:(nullable NSString *)param
                 info:(nullable NSDictionary *)info)
{
    [OpenRUM setCustomEventStartWithID:eventID
                                   name:eventName
                                  label:eventLabel
                                  param:param
                                  info:info];
}

RCT_REMAP_METHOD(setCustomEventEnd,
                 setCustomEventEndWithID:(NSString *)eventID
                 name:(nullable NSString *)eventName
                 label:(nullable NSString *)eventLabel
                 param:(nullable NSString *)param
                 info:(nullable NSDictionary *)info)
{
    [OpenRUM setCustomEventEndWithID:eventID
                                 name:eventName
                                label:eventLabel
                                param:param
                                info:info];
}

RCT_REMAP_METHOD(setRequestExtraInfo,
                 setRequestExtraInfoWithHeaderKey:(nonnull NSString *)headerKey
                 value:(nonnull NSString *)value
                 info:(nullable NSString *)info)
{
    [OpenRUM setRquestExtraInfoWithHeaderKey:headerKey
                                       value:value
                                        info:info];
}


/// 自定义异常收集
/// @param exceptionType 异常类型
/// @param causedBy 异常原因
/// @param errorDump 异常堆栈
RCT_EXPORT_METHOD(setCustomException:(NSString *)excType
                  causeBy:(nullable NSString *)causeBy
                  errorDump:(nullable NSString *)errorDump)
{
  [AlibabaCloudRUM setCustomException:excType causeBy:causeBy errorDump:errorDump];
}

RCT_REMAP_METHOD(setCustomMethodStart,
                 setCustomMethodStartWithName:(NSString *)methodName
                 param:(nullable NSString *)param)
{
    [OpenRUM setCustomMethodStartWithName:methodName
                                     param:param];
}

RCT_REMAP_METHOD(setCustomMethodEnd,
                 setCustomMethodEndWithName:(NSString *)methodName
                 param:(nullable NSString *)param)
{
    [OpenRUM setCustomMethodEndWithName:methodName param:param];
}

#pragma mark - report

/// 点击事件上报
RCT_EXPORT_METHOD(reportAction:(NSString *)time
                  type:(int)type
                  name:(NSString *)name
                  info:(NSString *)info
                  viewName:(NSString *)viewName
                  loadTime:(NSInteger)loadTime)
{
    long long timeValue = [time longLongValue];
   [OpenRUM reportActionWithTime:timeValue
                             type:type
                             name:name
                             info:info
                         viewName:viewName
                         loadTime:loadTime];
}

///视图事件上报
RCT_EXPORT_METHOD(reportView:(NSString *)time
                  viewId:(NSString *)viewId
                  loadTime:(NSInteger)loadTime
                  model:(int)model
                  name:(NSString *)name
                  methodName:(NSString *)methodName
                  routeId:(NSString *)routeId
                  reactTag:(int)reactTag)
{
    long long timeValue = [time longLongValue];
    [OpenRUM reportViewWithTime:timeValue
                          viewId:viewId
                        loadTime:loadTime
                           model:model
                            name:name
                      methodName:methodName];
  if (model == 1) {//仅进入生成路由Load事件
    [OpenRUM reportRNRouteChangeWithBundleTag:@(reactTag)
                                       routeID:routeId
                                     routeName:name
                                     routeTime:loadTime
                                          time:timeValue];
  }
}

/// 崩溃事件上报
RCT_EXPORT_METHOD(reportCrash:(NSString *)time
                  causeby:(NSString *)causeby
                  type:(NSString *)type
                  dump:(NSString *)dump)
{
    long long timeValue = [time longLongValue];
    
    [OpenRUM reportCrashWithTime:timeValue
                          causeby:causeby
                             type:type
                             dump:dump
                         pageType:0
                        bundleTag:nil
                         anchorID:nil
                        routeName:nil];

}

/// Bundle崩溃事件上报
RCT_EXPORT_METHOD(reportCrashBundleType:(int)bundleType
                  reactTag:(int)reactTag
                  routeId:(NSString *)routeId
                  routeName:(NSString *)routeName
                  time:(NSString *)time
                  causeby:(NSString *)causeby
                  type:(NSString *)type
                  dump:(NSString *)dump)
{
    if (reactTag <= 0) {
        return;
    }
    if (bundleType > 2 || bundleType < 1) {
        return;
    }
    long long timeValue = [time longLongValue];
    [OpenRUM reportCrashWithTime:timeValue
                          causeby:causeby
                             type:type
                             dump:dump
                         pageType:bundleType
                        bundleTag:@(reactTag)
                         anchorID:routeId
                        routeName:routeName];
}

#pragma mark - Private
- (instancetype)init {
  if (self = [super init]) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(rootViewDidAppear:) name:RCTContentDidAppearNotification object:nil];
  }
  return self;
}

- (void)rootViewDidAppear:(NSNotification *)noti {
  RCTRootView *rootView = noti.object;
  if (![rootView isKindOfClass:[RCTRootView class]]) {
    return;
  }
  SEL reactTagSelector = NSSelectorFromString(@"reactTag");
  if (![rootView respondsToSelector:reactTagSelector]) {
    return;
  }
  id reactTagNumber = [rootView performSelector:reactTagSelector];
  if (![reactTagNumber isKindOfClass:[NSNumber class]]) {
    return;
  }
  [OpenRUM reportBundleViewAppearTag:reactTagNumber moduleName:rootView.moduleName time:or_cpu_time_us()];
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}



@end
