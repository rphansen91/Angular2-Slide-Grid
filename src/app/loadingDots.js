var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var worker_1 = require("angular2/web_worker/worker");
var LoadingDots = (function () {
    function LoadingDots() {
    }
    LoadingDots = __decorate([
        worker_1.Component({
            selector: "dots"
        }),
        worker_1.View({
            styles: [
                '.dots {width: 16px;height: 16px;background-color: #ffffff;-webkit-border-radius: 30px;-moz-border-radius: 30px;-ms-border-radius: 30px;-o-border-radius: 30px;border-radius: 30px;display: inline-block;-webkit-animation: bouncedelay 1.4s infinite ease-in-ou',
                '.dots .bounce1 {-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}',
                '.dots .bounce2 {-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}'
            ],
            template: "\n\t\t<div class=\"dots\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], LoadingDots);
    return LoadingDots;
})();
exports.LoadingDots = LoadingDots;
//# sourceMappingURL=loadingDots.js.map