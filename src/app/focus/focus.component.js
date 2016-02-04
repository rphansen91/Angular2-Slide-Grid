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
var focus_service_1 = require("./focus.service");
var mainFocus_component_1 = require("./mainFocus.component");
var FocusControl = (function () {
    function FocusControl(focus) {
        this.focus = focus;
    }
    __decorate([
        angular2_1.Input('height'), 
        __metadata('design:type', Number)
    ], FocusControl.prototype, "height");
    FocusControl = __decorate([
        angular2_1.Component({
            selector: "focus-control",
            directives: [mainFocus_component_1.MainFocus],
            styleUrls: ["./app/focus/focus.css"],
            template: "\n\t\t<div class=\"blur\" [class.blurActive]=\"focus.active\" [style.height]=\"height\">\n\t\t\t<main-focus></main-focus>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [focus_service_1.FocusService])
    ], FocusControl);
    return FocusControl;
})();
exports.FocusControl = FocusControl;
//# sourceMappingURL=focus.component.js.map