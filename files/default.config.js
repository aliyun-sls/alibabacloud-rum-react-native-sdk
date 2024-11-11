module.exports = {
  react: {
    /**
     * Debug Logs
     */
    debug: false,

    /**
     * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
     * True = Will be instrumented
     */
    instrument: (filename) => {
        return true;
    },


    lifecycle: {
        /**
         * Monitor the navigation service switch. The default value is false
         */
        listenNavigation: true,

        /**
         * The data collection rules of component life cycle can be set to specify the fuzzy matching of component name
         */
        componentName: null,
    },
}
  };
  