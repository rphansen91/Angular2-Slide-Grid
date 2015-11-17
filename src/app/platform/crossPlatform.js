var devices_1 = require("./devices");
var browsers_1 = require("./browsers");
var CrossPlatform = (function () {
    function CrossPlatform() {
        if (CrossPlatform.isCreating) {
            this.userAgent = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
            this.setDeviceType();
            this.setBrowserType();
        }
        else {
            throw new Error("Can't use keyword new on Singleton CrossPlatform. Use CrossPlatform.getInstance()");
        }
    }
    CrossPlatform.getInstance = function () {
        if (CrossPlatform.instance == null) {
            CrossPlatform.isCreating = true;
            CrossPlatform.instance = new CrossPlatform();
            CrossPlatform.isCreating = false;
        }
        return CrossPlatform.instance;
    };
    CrossPlatform.prototype.setDeviceType = function () {
        this.device = devices_1.Devices.getInstance().getDevice(this.userAgent);
    };
    CrossPlatform.prototype.setBrowserType = function () {
        this.browser = browsers_1.Browsers.getInstance().getBrowser(this.userAgent);
    };
    CrossPlatform.isCreating = false;
    return CrossPlatform;
})();
exports.CrossPlatform = CrossPlatform;
//# sourceMappingURL=crossPlatform.js.map