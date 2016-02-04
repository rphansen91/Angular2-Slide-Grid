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
var customizations_service_1 = require('../../customizations/customizations.service');
var partners_service_1 = require('../../partners/partners.service');
var Opener = (function () {
    function Opener(customizations, _partnersService) {
        this.customizations = customizations;
        this._partnersService = _partnersService;
        this.showSubs = false;
    }
    Opener.prototype.openListing = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listingId);
    };
    Opener.prototype.openShare = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listingId + "?open=share");
    };
    Opener.prototype.openChat = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listingId + "?open=chat");
    };
    Opener.prototype.show = function () {
        this.showSubs = true;
    };
    Opener.prototype.hide = function () {
        this.showSubs = false;
    };
    __decorate([
        angular2_1.Input('id'), 
        __metadata('design:type', String)
    ], Opener.prototype, "listingId");
    Opener = __decorate([
        angular2_1.Component({
            selector: "opener",
            styleUrls: ["./app/focus/opener/opener.css"],
            directives: [angular2_1.NgIf],
            template: "\n\t\t<div class=\"openerContainer\"\n\t\t\t[style.color]=\"customizations.values.colors[0]\"\n\t\t\t(mouseenter)=\"show()\"\n\t\t\t(mouseleave)=\"hide()\">\n\t\t\t\n\t\t\t<div class=\"main\"\n\t\t\t\t[style.border-color]=\"customizations.values.colors[0]\"\n\t\t\t\t(mouseenter)=\"show()\"\n\t\t\t\t(click)=\"openListing()\">\n\t\t\t\t+\n\t\t\t</div>\n\t\t\t<div class=\"sub\" \n\t\t\t\t[style.border-color]=\"customizations.values.colors[0]\"\n\t\t\t\t[class.visible_one]=\"showSubs\"\n\t\t\t\t(click)=\"openChat()\">\n\t\t\t\t<span class=\"icon-chat\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"sub\" \n\t\t\t\t[style.border-color]=\"customizations.values.colors[0]\"\n\t\t\t\t[class.visible_two]=\"showSubs\"\n\t\t\t\t(click)=\"openShare()\">\n\t\t\t\t<span class=\"icon-share\"></span>\n\t\t\t</div>\n\t\t\t\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [customizations_service_1.Customizations, partners_service_1.PartnersService])
    ], Opener);
    return Opener;
})();
exports.Opener = Opener;
//# sourceMappingURL=opener.component.js.map