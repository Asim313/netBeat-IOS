"use strict";
exports.__esModule = true;
var OpenViduLogger = /** @class */ (function () {
    // private loggerFns: any [];
    function OpenViduLogger() {
        this.logger = window.console;
        this.LOG_FNS = [this.logger.log, this.logger.debug, this.logger.info, this.logger.warn, this.logger.error];
        // private MSG_PREFIXES = [
        // 	['[', ']'],
        // 	['[', '] WARN: '],
        // 	['[', '] ERROR: ']
        // ];
        this.isProdMode = false;
        // this.loggerFns = this.LOG_FNS.map((logTemplFn, i) => {
        // 	return logTemplFn.bind(this.logger, this.MSG_PREFIXES[i][0] + 'openvidu-browser' + this.MSG_PREFIXES[i][1]);
        // });
    }
    OpenViduLogger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.isProdMode) {
            this.LOG_FNS[0].apply(this.logger, arguments);
        }
    };
    OpenViduLogger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.isProdMode) {
            this.LOG_FNS[1].apply(this.logger, arguments);
        }
    };
    OpenViduLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.isProdMode) {
            this.LOG_FNS[2].apply(this.logger, arguments);
        }
    };
    OpenViduLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.isProdMode) {
            this.LOG_FNS[3].apply(this.logger, arguments);
        }
    };
    OpenViduLogger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.LOG_FNS[4].apply(this.logger, arguments);
    };
    OpenViduLogger.prototype.enableProdMode = function () {
        this.isProdMode = true;
    };
    return OpenViduLogger;
}());
exports.OpenViduLogger = OpenViduLogger;
//# sourceMappingURL=Logger.js.map