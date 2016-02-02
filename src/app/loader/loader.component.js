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
var customizations_service_1 = require('../customizations/customizations.service');
var loader_instance_1 = require("./loader.instance");
var WidgetLoader = (function () {
    function WidgetLoader(_loader, _customizations) {
        this._loader = _loader;
        this._customizations = _customizations;
        this.colors = this._customizations.values.colors;
    }
    WidgetLoader = __decorate([
        angular2_1.Component({
            selector: "widget-loader",
            directives: [angular2_1.NgIf, angular2_1.NgFor],
            styleUrls: ["./app/loader/loader.css"],
            template: "\n\t\t<div class=\"widget-loader\" *ng-if=\"_loader.loading\">\n\t\t\t<div class=\"widget-loader-bar\" *ng-for=\"#color of colors; #i = index;\"\n\t\t\t\t[style.background-color]=\"color\"\n\t\t\t\t[style.webkit-animation]=\"'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'\"\n\t\t\t\t[style.-moz-animation]=\"'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'\"\n\t\t\t\t[style.-o-animation]=\"'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'\"\n\t\t\t\t[style.-ms-animation]=\"'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'\"\n\t\t\t\t[style.animation]=\"'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'\"\n\t\t\t></div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [loader_instance_1.WidgetLoaderInstance, customizations_service_1.Customizations])
    ], WidgetLoader);
    return WidgetLoader;
})();
exports.WidgetLoader = WidgetLoader;
//# sourceMappingURL=loader.component.js.map