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
var angular2_1 = require('angular2/angular2');
var CallToAction = (function () {
    function CallToAction() {
        this.image = "./app/assets/callToAction.png";
    }
    CallToAction.prototype.onInit = function () { };
    CallToAction.prototype.onchange = function (change) { console.log(this.hidden); };
    CallToAction.prototype.show = function () {
        this.hidden = false;
    };
    CallToAction.prototype.hide = function () {
        this.hidden = false;
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], CallToAction.prototype, "hidden");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], CallToAction.prototype, "image");
    CallToAction = __decorate([
        angular2_1.Component({
            selector: "call-to-action",
            inputs: ["hidden: hidden", "image: image"]
        }),
        angular2_1.View({
            styles: [
                ".callToAction {position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 10; visibility: visible; opacity: 1;}",
                ".callToActionAnimated {-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;}",
                ".callToActionRemoved {visibility: hidden; opacity: 0;}",
                ".callToActionImage {position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0; height: 50%; width: 60%; min-width: 300px; max-width: 500px; background-size: contain; background-position: center; background-repeat: no-repeat;}"
            ],
            template: "\n\t\t<div class=\"callToAction callToActionAnimated\" [class.callToActionRemoved]=\"hidden\">\n\t\t\t<div class=\"callToActionImage\" [style.background-image]=\"'url(' + image + ')'\"></div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], CallToAction);
    return CallToAction;
})();
exports.CallToAction = CallToAction;
//# sourceMappingURL=callToAction.js.map