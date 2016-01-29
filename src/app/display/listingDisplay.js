var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var slideShow_1 = require('./slideShow');
var price_1 = require('./price');
var partners_service_1 = require('../partners/partners.service');
var ListingDisplay = (function () {
    function ListingDisplay(_partnersService) {
        this._partnersService = _partnersService;
        this.opening = false;
    }
    ListingDisplay.prototype.onInit = function () {
        this.slide = slideShow_1.SlideItems.getInstance().add(this.listing.photos, this.width);
    };
    ListingDisplay.prototype.goToApp = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
        this.opening = false;
    };
    ListingDisplay.prototype.startSolo = function () {
        var listing = this;
        this.opening = true;
        this.id = setTimeout(function () {
            listing.slide.setPositionSize(listing.width).start();
        }, 200);
    };
    ListingDisplay.prototype.endSolo = function () {
        this.opening = false;
        clearTimeout(this.id);
        this.slide.stop();
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Listing)
    ], ListingDisplay.prototype, "listing", void 0);
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "width", void 0);
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "height", void 0);
    ListingDisplay = __decorate([
        angular2_1.Component({
            selector: "listing-display",
            inputs: ["listing: listing", "width: width", "height: height"],
            providers: [slideShow_1.SlideItems],
            pipes: [price_1.PriceDisplay],
            directives: [angular2_1.NgIf],
            styles: [
                '.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
                '.opening {-webkit-transform: scale(1.3); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 11;}',
                '.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
                '.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
            ],
            template: "\n\t\t<div class=\"listingDisplay\" (click)=\"goToApp()\" [class.opening]=\"opening\" [style.width]=\"width\" [style.height]=\"height\" [style.background-position]=\"slide.positioning()\" [style.background-image]=\"slide.image\" (mouseenter)=\"startSolo()\" (mouseleave)=\"endSolo()\" (touchstart)=\"startSolo()\" (touchend)=\"endSolo()\">\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\">$ {{listing.price | price}}</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [partners_service_1.PartnersService])
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
        this.listingColumns = [];
        this.listingRows = [];
        this.defaultWidth = 175;
        this.defaultHeight = 150;
        this.columns = Math.floor(totalWidth / this.defaultWidth);
        this.rows = Math.floor(totalHeight / this.defaultHeight);
        this.width = (totalWidth / this.columns);
        this.height = (totalHeight / this.rows);
        ListingGrid.grid = this;
    }
    ListingGrid.prototype.addListings = function (listings, columnOrRow) {
        columnOrRow = (columnOrRow == "column") ? "column" : "row";
        switch (columnOrRow) {
            case "column":
                listings.map(ListingGrid.grid.addListingToColumn);
                break;
            case "row":
                listings.map(ListingGrid.grid.addListingToRow);
                break;
        }
    };
    ListingGrid.prototype.addListingToRow = function (listing, index) {
        var row = Math.floor(index / ListingGrid.grid.columns);
        ListingGrid.grid.insertOrCreate(listing, row, ListingGrid.grid.listingRows);
    };
    ListingGrid.prototype.addListingToColumn = function (listing, index) {
        var column = index % ListingGrid.grid.columns;
        ListingGrid.grid.insertOrCreate(listing, column, ListingGrid.grid.listingColumns);
    };
    ListingGrid.prototype.insertOrCreate = function (item, index, arr) {
        if (arr && arr[index]) {
            arr[index].listings.push(item);
        }
        else {
            arr.push({ listings: [item] });
        }
    };
    return ListingGrid;
})();
exports.ListingGrid = ListingGrid;
//# sourceMappingURL=listingDisplay.js.map