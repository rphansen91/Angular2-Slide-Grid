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
var customizations_service_1 = require('../../customizations/customizations.service');
var slidePositions_1 = require('../slide/slidePositions');
var price_1 = require('./price');
var partners_service_1 = require('../../partners/partners.service');
var grid_service_1 = require('../grid/grid.service');
var focus_service_1 = require('../../focus/focus.service');
var ListingDisplay = (function () {
    function ListingDisplay(_slidePositions, _partnersService, _customizations, _listingGrid, _focusService) {
        this._slidePositions = _slidePositions;
        this._partnersService = _partnersService;
        this._customizations = _customizations;
        this._listingGrid = _listingGrid;
        this._focusService = _focusService;
    }
    ListingDisplay.prototype.onInit = function () {
        this.color = this._customizations.values.colors[0];
    };
    ListingDisplay.prototype.goToApp = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
    };
    ListingDisplay.prototype.debounceStart = function () {
        var _this = this;
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(function () {
            _this.startSolo();
        }, 300);
    };
    ListingDisplay.prototype.debounceEnd = function () {
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
    };
    ListingDisplay.prototype.startSolo = function () {
        var listing = this.listing;
        this._focusService.activate(listing);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], ListingDisplay.prototype, "listing");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "width");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "height");
    ListingDisplay = __decorate([
        angular2_1.Component({
            selector: "listing-display",
            pipes: [price_1.PriceDisplay],
            directives: [angular2_1.NgIf],
            styleUrls: ["./app/display/listing/listing.css"],
            template: "\n\t\t<div *ng-if=\"listing\" class=\"listingDisplay\" \n\t\t\t[style.width]=\"width\" \n\t\t\t[style.height]=\"height\"\n\t\t\t[style.top]=\"listing.top\"\n\t\t\t[style.left]=\"listing.left\"\n\t\t\t[style.background-image]=\"'url(' + listing.photos[listing.photos.length - 1].url + ')'\"\n\t\t\t(click)=\"startSolo()\"\n            (mouseleave)=\"debounceEnd()\"\n\t\t\t(mouseenter)=\"debounceStart()\" \n\t\t\t(touchstart)=\"debounceStart()\">\n\t\t\t\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\t\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\" [style.background-color]=\"color\">$ {{listing.price | price}}</div>\n\t\t\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [slidePositions_1.SlidePositions, partners_service_1.PartnersService, customizations_service_1.Customizations, grid_service_1.ListingGrid, focus_service_1.FocusService])
    ], ListingDisplay);
    return ListingDisplay;
})();
exports.ListingDisplay = ListingDisplay;
//# sourceMappingURL=listing.component.js.map