var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var devices_1 = require("./devices");
var browsers_1 = require("./browsers");
var CrossPlatform = (function () {
    function CrossPlatform() {
        this.userAgent = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
        this.setDeviceType();
        this.setBrowserType();
    }
    CrossPlatform.prototype.setDeviceType = function () {
        this.device = devices_1.Devices.getInstance().getDevice(this.userAgent);
    };
    CrossPlatform.prototype.setBrowserType = function () {
        this.browser = browsers_1.Browsers.getInstance().getBrowser(this.userAgent);
    };
    CrossPlatform = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CrossPlatform);
    return CrossPlatform;
})();
exports.CrossPlatform = CrossPlatform;
//# sourceMappingURL=crossPlatform.js.map