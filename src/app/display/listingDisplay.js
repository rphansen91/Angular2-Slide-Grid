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
var slideShow_1 = require('./slideShow');
var ListingDisplay = (function () {
    function ListingDisplay() {
        this.opening = false;
    }
    ListingDisplay.prototype.onInit = function () {
        this.slide = slideShow_1.SlideItems.getInstance().add(this.listing.photos, this.width);
    };
    ListingDisplay.prototype.goToApp = function () {
        window.open("https://antengo.com/p?antengo/#/itemDetail/" + this.listing.id);
        this.opening = false;
    };
    ListingDisplay.prototype.startSolo = function () {
        this.opening = true;
        this.slide.start();
    };
    ListingDisplay.prototype.endSolo = function () {
        this.opening = false;
        this.slide.stop();
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Listing)
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
            inputs: ["listing: listing", "width: width", "height: height"],
            providers: [slideShow_1.SlideItems]
        }),
        angular2_1.View({
            directives: [angular2_1.NgIf],
            styles: [
                '.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: 100%; background-repeat: no-repeat;-ms-transform: scale(1); -webkit-transform: scale(1); transform: scale(1);}',
                '.opening {-ms-transform: scale(1.3); transform: scale(1.3); z-index: 2;}',
                '.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;text-shadow: black 2px 2px 3px;line-height: 35px;padding: 0px 18px;background-color: rgba(174, 146, 204, 0.8);}',
                '.title {position: absolute;bottom: 0px;right: 0px; left: 0px; color: rgb(255, 255, 255);font-size: 20px;text-shadow: black 2px 2px 3px;line-height: 35px;padding: 0px 18px;background-color: rgba(174, 146, 204, 0.8);}'
            ],
            template: "\n\t\t<div class=\"listingDisplay\" (click)=\"goToApp()\" [class.opening]=\"opening\" [style.width]=\"width\" [style.height]=\"height\" [style.background-position]=\"slide.positioning()\" [style.background-image]=\"slide.image\" (mouseenter)=\"startSolo()\" (mouseleave)=\"endSolo()\" (touchstart)=\"startSolo()\" (touchend)=\"endSolo()\">\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\">$ {{listing.price}}</div>\n\t\t</div\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], ListingDisplay);
    return ListingDisplay;
})();
exports.ListingDisplay = ListingDisplay;
var Listing = (function () {
    function Listing() {
    }
    return Listing;
})();
exports.Listing = Listing;
var ListingGrid = (function () {
    function ListingGrid(totalWidth, totalHeight) {
        this.defaultWidth = 175;
        this.defaultHeight = 150;
        this.columns = Math.floor(totalWidth / this.defaultWidth);
        this.rows = Math.floor(totalHeight / this.defaultHeight);
        this.width = (totalWidth / this.columns);
        this.height = (totalHeight / this.rows);
    }
    return ListingGrid;
})();
exports.ListingGrid = ListingGrid;
//# sourceMappingURL=listingDisplay.js.map