/**
* react-native-OpenRUM.d.ts
*
* Type definition file for the react native OpenRUM package
*/

/**
 * Specifying a platform when you want individual behaviour
 */
export declare enum Platform {
	/**
	 * Android Platform
	 */
	Android,

	/**
	 * iOS Platform
	 */
	Ios
}

/**
 * Level of log message that will be printed
 */
export declare enum LogLevel {
	/**
	 * A lot of diagnostic infos will be printed
	 */
	Debug,

	/**
	 * Only the necessary infos will be printed
	 */
	Info
}

/**
 * Enum that represents the different privacy levels.
 */
export declare enum DataCollectionLevel {
	/**
	 * @member {DataCollectionLevel} Off
	 * @description Native Agent doesn't capture any monitoring data.
	 */
	Off,

	/**
	 * @member {DataCollectionLevel} Performance
	 * @description Native Agent captures only anonymous performance data.
	 */
	Performance,

	/**
	 * @deprecated Replaced by UserBehavior
	 * @member {DataCollectionLevel} User
	 * @description Native Agent captures both performance and user data.
	 */
	User,

	/**
	 * @member {DataCollectionLevel} UserBehavior
	 * @description Native Agent captures both performance and user data.
	 */
	UserBehavior,
}

export declare const OpenRUM: {

	/**
	 * Starting the whole plugin and agent manually
	 * @param configuration Configuration of the manual startup
	 */
	start(configuration: ManualStartupConfiguration): Promise<void>;

	/**
	 * Enter an action
	 * @param {string} actionName - name of action
	 * @param {Platform} platform - if empty default is both platforms
	 * @return id of created action
	 */
	enterAction(name: string, platform?: Platform): OpenRUMAction;

	/**
	 * End a session
	 * @param {Platform} platform - if empty default is both platforms
	 */
	endSession(platform?: Platform): void;

	/**
	 * Identify the session with a user string
	 * @param {string} user - username which should be used for the session
	 * @param {Platform} platform - if empty default is both platforms
	 */
	identifyUser(user: string, platform?: Platform): void;

	/**
	 * Flush all events in db
	 * @param {Platform} platform - if empty default is both platforms
	 */
	flushEvents(platform?: Platform): void;

	/**
	 * Get the current data collection level (Off, Performance, UserBehavior)
	 * @deprecated Replaced by getUserPrivacyOptions
	 * @param {Platform} platform - if empty default is both platforms
	 * @returns promise which resolve a data collection level string
	 */
	getDataCollectionLevel(platform?: Platform): Promise<DataCollectionLevel>;

	/**
	 * Set the data collection level (Off, Performance, UserBehavior)
	 * @deprecated Replaced by applyUserPrivacyOptions
	 * @param {DataCollectionLevel} dataCollectionLevel - Off, Performance, UserBehavior
	 * @param {Platform} platform - if empty default is both platforms
	 */
	setDataCollectionLevel(dataCollectionLevel: DataCollectionLevel, platform?: Platform): void;

	/**
	 * Get the current user privacy options including data collection
	 * level (Off, Performance, UserBehavior) and if crash reporting
	 * is enabled
	 * @param {Platform} platform - if empty default is both platforms
	 */
	getUserPrivacyOptions(platform?: Platform): Promise<UserPrivacyOptions>;

	/**
	 * Set the data collection level (Off, Performance, UserBehavior)
	 * @param {DataCollectionLevel} dataCollectionLevel - Off, Performance, UserBehavior
	 * @param {boolean} crashReportingOptedIn - is crash reporting enabled
	 * @param {Platform} platform - if empty default is both platforms
	 */
	applyUserPrivacyOptions(userPrivacyOptions: UserPrivacyOptions, platform?: Platform): void;

	/**
	 * Report an error without an action
	 * @param {string} errorName - Name of the error event
	 * @param {number} errorCode - The code of the error
	 * @param {Platform} platform - if empty default is both platforms
	 */
	reportError(errorName: string, errorCode: number, platform?: Platform): void;

	/**
	 * Reports a stacktrace
	 * @param {String} errorName Name of the Error - SyntaxError
	 * @param {String} reason Reason for the Error
	 * @param {String} stacktrace Whole Stacktrace
	 * @param {Number} platform Platform wise or both
	 */
	reportErrorWithStacktrace(errorName: string, reason: string, stacktrace: string, platform?: Platform): void;

	/**
	 * Reports a crash
	 * @param {String} crashName Name of the Crash
	 * @param {String} reason Reason for the Crash
	 * @param {String} stacktrace Whole Stacktrace
	 * @param {Number} platform Platform wise or both
	 */
	reportCrash(crashName: string, reason: string, stacktrace: string, platform?: Platform): void;
}

export declare class OpenRUMAction {
	/**
	 * Report an error
	 * @param {string} errorName - Name of the error event
	 * @param {number} errorCode - The code of the error
	 * @param {Platform} platform - if empty default is both platforms
	 */
	reportError(errorName: string, errorCode: number, platform?: Platform): void;

	/**
	 * Report an event
	 * @param {string} eventName - Name of the event
	 * @param {Platform} platform - if empty default is both platforms
	 */
	reportEvent(eventName: string, platform?: Platform): void;
	/**
	 * Leave action
	 * @param {Platform} platform - if empty default is both platforms
	 */
	leaveAction(platform?: Platform): void;
}

/**
 * Represents the privacy settings that the user can select
 */
export declare class UserPrivacyOptions {

	/**
	 * Constructor for creation of a privacy settings object
	 * @param dataCollectionLevel Data collection level.
	 * @param crashReportingOptedIn If crash reporting should be enabled.
	 */
	constructor(dataCollectionLevel: DataCollectionLevel, crashReportingOptedIn: boolean);

	/**
	 * Returns the specified data collection level.
	 *
	 * @returns the specified data collection level
	 */
	get dataCollectionLevel(): DataCollectionLevel;

	/**
	 * Sets the data collection level specified by the user.
	 *
	 * @param dataCollectionLevel the specified data collection level from the user
	 */
	set dataCollectionLevel(dataCollectionLevel: DataCollectionLevel);

	/**
	 * Returns the opt-in value for crash reporting.
	 *
	 * @return the opt-in value for crash reporting
	 */
	get crashReportingOptedIn(): boolean;

	/**
	 * Sets the privacy setting for crash reporting.
	 *
	 * @param crashReportingOptedIn the opt-in value specified by the user
	 */
	set crashReportingOptedIn(crashReportingOptedIn: boolean);
}

/**
 * Manual startup configuration which is used for OpenRUM.start()
 */
export declare class ManualStartupConfiguration {
	/**
	 * Creates a Manual Startup configuration instance
	 * @param beaconUrl Identifies your environment within OpenRUM. This property is mandatory for manual startup
	 * @param applicationId Identifies your mobile app. This property is mandatory for manual startup
	 * @param reportCrash Allows reporting React Native crashes.
	 * @param logLevel Allows you to choose between `LogLevel.Info` and `LogLevel.Debug`. Debug returns more logs. This is especially important when something is not functioning correctly.
	 * @param lifecycleUpdate Decide if you want to see update cycles on lifecycle actions as well. This is per default false as it creates a lot more actions.
	 * @param certificateValidation Allows the use of self-signed certificates.
	 * @param userOptIn Activates the privacy mode when set to `true`. User consent must be queried and set.
	 */
	constructor(beaconUrl: string, applicationId: string, reportCrash?: boolean,
		logLevel?: LogLevel, lifecycleUpdate?: boolean, certificateValidation?: boolean,
		userOptIn?: boolean);
}
