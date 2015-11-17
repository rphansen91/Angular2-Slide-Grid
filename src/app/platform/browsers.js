var Browsers = (function () {
    function Browsers() {
        this.all = [];
        if (Browsers.isCreating) {
            this.all.push(new Browser("chrome", /chrome/i));
            this.all.push(new Browser("safari", /safari/i));
            this.all.push(new Browser("firefox", /firefox/i));
            this.all.push(new Browser("ie", /internet explorer/i));
        }
        else {
            throw new Error("Can't use keyword new on Singleton Browsers. Use Browsers.getInstance()");
        }
    }
    Browsers.getInstance = function () {
        if (Browsers.instance == null) {
            Browsers.isCreating = true;
            Browsers.instance = new Browsers();
            Browsers.isCreating = false;
        }
        return Browsers.instance;
    };
    Browsers.prototype.getBrowser = function (userAgent) {
        var userBrowser;
        this.all.forEach(function (browser) {
            if (browser.regEx.test(userAgent)) {
                userBrowser = browser;
            }
        });
        return userBrowser;
    };
    Browsers.isCreating = false;
    return Browsers;
})();
exports.Browsers = Browsers;
var Browser = (function () {
    function Browser(type, regEx) {
        this.type = type;
        this.regEx = regEx;
    }
    return Browser;
})();
exports.Browser = Browser;
//# sourceMappingURL=browsers.js.map