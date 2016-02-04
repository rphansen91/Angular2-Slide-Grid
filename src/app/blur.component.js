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
var BlurService = (function () {
    function BlurService() {
        this.active = false;
    }
    BlurService.prototype.show = function () {
        this.active = true;
    };
    BlurService.prototype.hide = function () {
        this.active = false;
    };
    BlurService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BlurService);
    return BlurService;
})();
exports.BlurService = BlurService;
var Blur = (function () {
    function Blur(blur) {
        this.blur = blur;
    }
    Blur = __decorate([
        angular2_1.Component({
            selector: "bkgd-blur",
            styles: [
                ".blur {position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); z-index: 2; opacity: 0; visibility: hidden;\n\t\t\t\t-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;\n\t\t\t\t-moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;\n\t\t\t\t-ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;\n\t\t\t\t-o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;\n\t\t\t\ttransition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;\n\t\t}",
                ".blurActive {opacity: 1; visibility: visible;\n\t\t\t\t-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;\n\t\t\t\t-moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;\n\t\t\t\t-ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;\n\t\t\t\t-o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;\n\t\t\t\ttransition: opacity 0.2s ease-in, visibility 0s ease-in 0s;\n\t\t}"
            ],
            template: "\n\t\t<div class=\"blur\" [class.blurActive]=\"blur.active\"></div>\n\t"
        }), 
        __metadata('design:paramtypes', [BlurService])
    ], Blur);
    return Blur;
})();
exports.Blur = Blur;
//# sourceMappingURL=blur.component.js.map