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
var partners_service_1 = require('./partners/partners.service');
var SellIt = (function () {
    function SellIt(_partnersService) {
        this._partnersService = _partnersService;
        this.hovering = "";
    }
    SellIt.prototype.sell = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/post");
    };
    SellIt.prototype.isHovering = function () {
        var _this = this;
        var count = 0;
        this.hoveringId = setInterval(function () {
            _this.hovering = _this.getCurrentLetters(count);
            count++;
        }, 100, 3);
    };
    SellIt.prototype.notHovering = function () {
        clearInterval(this.hoveringId);
        this.hovering = "";
    };
    SellIt.prototype.getCurrentLetters = function (count) {
        switch (count) {
            case 0: return "e";
            case 1: return "el";
            case 2: return "ell";
            default: return "ell";
        }
    };
    __decorate([
        angular2_1.Input('show'), 
        __metadata('design:type', Boolean)
    ], SellIt.prototype, "show");
    SellIt = __decorate([
        angular2_1.Component({
            selector: "sell-it",
            directives: [angular2_1.NgIf],
            styles: [
                ".sell {\n\t\t\tposition: fixed;\n\t\t\tz-index: 3;\n\t\t\ttop: 20px;\n\t\t\tright: 101%;\n\t\t\theight: 60px;\n\t\t\twidth: 60px;\n\t\t\tline-height: 60px;\n\t\t\tborder-radius: 30px;\n\t\t\tfont-size: 32px;\n\t\t\tcolor: #8c77b6;\n\t\t\ttext-align: center;\n\t\t\tbackground-color: rgba(255, 255, 255, 1);\n\t\t\tbox-shadow: 0 8px 12px 0 rgba(0,0,0,0.6);\n\t\t\tcursor: pointer;\n\t\t\t-webkit-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);\n\t   \t\t-moz-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);\n\t    \t-ms-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53); \n\t     \t-o-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53); \n\t        transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);\n\t\t}",
                ".sell:hover {\n\t\t\tbox-shadow: 0 1px 2px 0 rgba(0,0,0,0.3);\n\t\t}",
                ".sell.show {\n\t\t\tright: 32px;\n\t\t}",
                ".sellText {color: #333; font-size: 18px}"
            ],
            template: "\n\t\t<div class=\"sell\" [class.show]=\"show\" (click)=\"sell()\" (mouseenter)=\"isHovering()\" (mouseleave)=\"notHovering()\">\n\t\t\t<span>$</span><span *ng-if=\"hovering\" class=\"sellText\">{{hovering}}</span>\n\t\t</div>\n\t",
        }), 
        __metadata('design:paramtypes', [partners_service_1.PartnersService])
    ], SellIt);
    return SellIt;
})();
exports.SellIt = SellIt;
//# sourceMappingURL=sellIt.component.js.map