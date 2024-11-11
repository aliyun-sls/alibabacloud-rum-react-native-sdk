package com.openrum.sdk.bridge;

import android.text.TextUtils;
import android.util.Log;

import com.alibabacloud.rum.AlibabaCloudRum;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.openrum.sdk.agent.OpenRum;
import com.openrum.sdk.agent.business.entity.NetworkCustomEventBean;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class OpenRUMRNBridge extends ReactContextBaseJavaModule {

    private String configAddress;
    private String appVersion;
    private String channelID;
    private String deviceID;
    private int dropFrameTime;
    private boolean useCustomLaunch;

    public OpenRUMRNBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "openrumRNBridge";
    }

    /**
     * @param time     时间发生时间
     * @param type     操作类型
     * @param name     控件名称
     * @param info     控件信息
     * @param viewName 视图名称
     * @param loadTime 执行耗时
     */
    @ReactMethod
    public void reportAction(String time, int type, String name, String info, String viewName, int loadTime) {
        com.openrum.sdk.agent.engine.external.OpenRUMRNBridge.reportAction(Long.parseLong(time), type, name, info, viewName, loadTime);
    }

    /**
     * @param time       时间发生时间
     * @param viewId     视图id
     * @param loadTime   加载耗时
     * @param model      方式 「1:进入，2:退出」
     * @param name       视图名称
     * @param methodName 方法名称
     */
    @ReactMethod
    public void reportView(String time, String viewId, int loadTime, int model, String name, String methodName, String routeId, int reactTag) {
        com.openrum.sdk.agent.engine.external.OpenRUMRNBridge.reportView(Long.parseLong(time), viewId, loadTime, model, name, methodName, routeId, reactTag);
    }

    /**
     * @param time    时间发生时间
     * @param causeBy 崩溃原因
     * @param type    崩溃类型
     * @param dump    堆栈信息
     */
    @ReactMethod
    public void reportCrash(String time, String causeBy, String type, String dump) {
        com.openrum.sdk.agent.engine.external.OpenRUMRNBridge.reportCrash(Long.parseLong(time), causeBy, type, dump);
    }

    /**
     * @param time    时间发生时间
     * @param causeBy 崩溃原因
     * @param type    崩溃类型
     * @param dump    堆栈信息
     */
    @ReactMethod
    public void reportCrashBundleType(int bundleType, int reactTag, String routeId, String routeName, String time, String causeBy, String type, String dump) {
        Log.d("DEBUGGGGG", "reportCrashBundleType");
        com.openrum.sdk.agent.engine.external.OpenRUMRNBridge.reportCrashBundleType(bundleType, reactTag, routeId, routeName, Long.parseLong(time), causeBy, type, dump);
    }

    @ReactMethod
    public void setCustomLog(String logInfo, String name, String snapshots, String level, ReadableMap attributes) {
        Log.d("DEBUGGGGG", "setCustomLog");
        Map<String, Object> extra = new HashMap<>();
        if (null != attributes) {
            extra = attributes.toHashMap();
        }

        AlibabaCloudRum.setCustomLog(logInfo, name, snapshots, level, extra);
    }

    @ReactMethod
    public void setCustomEvent(String name, String group, String snapshots, double value, ReadableMap info) {
        Log.d("DEBUGGGGG", "setCustomEvent");
        Map<String, Object> extra = new HashMap<>();
        if (null != info) {
            extra = info.toHashMap();
        }
        AlibabaCloudRum.setCustomEvent(name, group, snapshots, value, extra);
        //
        //OpenRum.setCustomEventWithLabel(eventId, eventName, eventLabel, param, extra);
    }

    @ReactMethod
    public void setCustomMetric(String name, double value, String param) {
        try {
            BigDecimal bigDecimal = new BigDecimal(value);
            String str = bigDecimal.toPlainString();
            if (str.contains(".")) {
                str = str.substring(0, str.indexOf("."));
            }
            long time = Long.parseLong(str);
            OpenRum.setCustomMetric(name, time, param);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 冷启动结束调用方法，需要与 withUseCustomLaunch 配合使用，
     * withUseCustomLaunch(true)时，自定义冷启动结束方法生效
     */
    @ReactMethod
    public void recordCustomLaunchEnd() {
        OpenRum.recordCustomLaunchEnd();
    }

    /**
     * userId 数字字母加:_- 按256位限制大小，超过则调用失败
     *
     * @param userName 用户名称
     */
    @ReactMethod
    public void setUserName(String userName) {
        AlibabaCloudRum.setUserName(userName);
    }

    @ReactMethod
    public void setUserExtraInfo(ReadableMap extraInfo) {
        Map<String, Object> extra = new HashMap<>();
        if (null != extraInfo) {
            extra = extraInfo.toHashMap();
        }

        AlibabaCloudRum.setUserExtraInfo(extra);
    }

    @ReactMethod
    public void setCustomMethodStart(String methodName, String param) {
        OpenRum.setCustomMethodStart(methodName, param);
    }

    @ReactMethod
    public void setCustomMethodEnd(String methodName, String param) {
        OpenRum.setCustomMethodEnd(methodName, param);
    }

    /**
     * 自定义异常
     *
     * @param excType   异常类型(必要) limit(0-256字符)
     * @param causeBy   异常原因 limit(0-512字符)
     * @param errorDump 异常信息 limit(0-10000字符)
     */
    @ReactMethod
    public void setCustomException(String excType, String causeBy, String errorDump) {
        AlibabaCloudRum.setCustomException(excType, causeBy, errorDump);
    }

    @ReactMethod
    public void startWithAppID(String appID) {
        OpenRum.withAppID(appID).withConfigAddress(configAddress).withAppVersion(appVersion).withChannelID(channelID).
                withDeviceID(deviceID).withDropFrameTime(dropFrameTime).
                withUseCustomLaunch(useCustomLaunch).start();
    }

    @ReactMethod
    public void setConfigAddress(String configAddress) {
        this.configAddress = configAddress;
    }

    @ReactMethod
    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    @ReactMethod
    public void setChannelID(String channelID) {
        this.channelID = channelID;
    }

    @ReactMethod
    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    @ReactMethod
    public void setDropFrameTime(int time) {
        this.dropFrameTime = time;
    }

    @ReactMethod
    public void useCustomLaunch(boolean useCustomLaunch) {
        this.useCustomLaunch = useCustomLaunch;
    }

    @ReactMethod
    public static void deviceID(Promise promise) {
        String deviceID = OpenRum.getDeviceID();
        if (deviceID != null) {
            promise.resolve(deviceID);
        }
    }

    @ReactMethod
    public static void sdkVersion(Promise promise) {
        String sdkVersion = OpenRum.getSdkVersion();
        if (sdkVersion != null) {
            promise.resolve(sdkVersion);
        }
    }
}
