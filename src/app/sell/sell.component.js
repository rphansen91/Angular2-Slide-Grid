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
var partners_service_1 = require('../partners/partners.service');
var customizations_service_1 = require('../customizations/customizations.service');
var SellButton = (function () {
    function SellButton(customizations, _partnersService) {
        this.customizations = customizations;
        this._partnersService = _partnersService;
        this.hovering = false;
    }
    SellButton.prototype.sell = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/post");
    };
    SellButton.prototype.isHovering = function () {
        this.hovering = true;
    };
    SellButton.prototype.notHovering = function () {
        this.hovering = false;
    };
    __decorate([
        angular2_1.Input('show'), 
        __metadata('design:type', Boolean)
    ], SellButton.prototype, "show");
    SellButton = __decorate([
        angular2_1.Component({
            selector: "sell-button",
            directives: [angular2_1.NgIf],
            styleUrls: ["./app/sell/sell.css"],
            template: "\n\t\t<div class=\"sell\"\n\t\t\t[class.show]=\"show\"\n\t\t\t[class.oblong]=\"hovering\" \n\t\t\t[style.color]=\"customizations.values.colors[0]\"\n\t\t\t[style.box-shadow]=\"'0 8px 12px 0' + customizations.values.colors[0]\"\n\t\t\t(click)=\"sell()\" \n\t\t\t(mouseenter)=\"isHovering()\" \n\t\t\t(mouseleave)=\"notHovering()\">\n\t\t\t\t<div class=\"dollarContainer\">\n\t\t\t\t\t<span>$</span><span *ng-if=\"hovering\" class=\"sellText\">ell</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"featuredText\" [class.featuredTextVisible]=\"hovering\">\n\t\t\t\t\tand get\n<span class=\"bold\">featured</span>\nhere <img class=\"partnerLogo\" [src]=\"customizations.values.partnerLogo\"/>\n\t\t\t\t</div>\n\t\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [customizations_service_1.Customizations, partners_service_1.PartnersService])
    ], SellButton);
    return SellButton;
})();
exports.SellButton = SellButton;
//# sourceMappingURL=sell.component.js.map