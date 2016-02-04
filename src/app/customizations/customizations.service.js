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
var Customizations = (function () {
    function Customizations() {
        this.values = {
            cardWidth: 175,
            cardHeight: 150,
            fontUrl: "./app/assets/Brown-Light.ttf",
            colors: ["#8c77b6", "#baadd3", "#f3f1f7"],
            partnerLogo: "./app/assets/logos/nbc.png"
        };
    }
    Customizations.prototype.initialize = function () {
        var _this = this;
        var url = window.location.href.split("?");
        if (url[1]) {
            var values = url[1].split("&")
                .map(function (val) {
                return val.split("=");
            });
            values.forEach(function (val) {
                if (_this.values[val[0]]) {
                    _this.values[val[0]] = (val[1].split(",").length > 1) ? val[1].split(",") : val[1];
                }
            });
        }
    };
    Customizations = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Customizations);
    return Customizations;
})();
exports.Customizations = Customizations;
//# sourceMappingURL=customizations.service.js.map