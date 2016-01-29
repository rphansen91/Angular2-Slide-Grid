var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var worker_1 = require('angular2/web_worker/worker');
var slideShow_1 = require('./slideShow');
var price_1 = require('./price');
var easings_1 = require('./easings');
var ListingDisplay = (function () {
    function ListingDisplay() {
        this.opening = false;
    }
    ListingDisplay.prototype.onInit = function () {
        this.slide = slideShow_1.SlideItems.getInstance().add(this.listing.photos, this.width);
    };
    ListingDisplay.prototype.goToApp = function () {
        // window.open("https://antengo.com/p?antengo/#/itemDetail/" + this.listing.id);
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
        worker_1.Input(), 
        __metadata('design:type', Listing)
    ], ListingDisplay.prototype, "listing", void 0);
    __decorate([
        worker_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "width", void 0);
    __decorate([
        worker_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "height", void 0);
    ListingDisplay = __decorate([
        worker_1.Component({
            selector: "listing-display",
            inputs: ["listing: listing", "width: width", "height: height"],
            providers: [slideShow_1.SlideItems],
            pipes: [price_1.PriceDisplay],
            directives: [worker_1.NgIf],
            styles: [
                '.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
                '.listingDisplayAnimated {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
                '.opening {-webkit-transform: scale(1.5); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 100000;}',
                '.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
                '.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
            ],
            template: "\n\t\t<div *ng-if=\"!listing.position\" class=\"listingDisplay\" (click)=\"goToApp()\" [class.opening]=\"opening\" [style.width]=\"width\" [style.height]=\"height\" [style.background-position]=\"slide.positioning()\" [style.background-image]=\"slide.image\" (mouseenter)=\"startSolo()\" (mouseleave)=\"endSolo()\" (touchstart)=\"startSolo()\" (touchend)=\"endSolo()\">\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\">$ {{listing.price | price}}</div>\n\t\t</div>\n\n\t\t<div *ng-if=\"listing.position\" class=\"listingDisplayAnimated\" (click)=\"goToApp()\" [class.opening]=\"opening\" [style.opacity]=\"listing.position.opacity\" [style.top]=\"listing.position.top\" [style.left]=\"listing.position.left\" [style.width]=\"width\" [style.height]=\"height\" [style.background-position]=\"slide.positioning()\" [style.background-image]=\"slide.image\" (mouseenter)=\"startSolo()\" (mouseleave)=\"endSolo()\" (touchstart)=\"startSolo()\" (touchend)=\"endSolo()\">\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\">$ {{listing.price | price}}</div>\n\t\t</div>\n\t"
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
        this.totalWidth = totalWidth;
        this.totalHeight = totalHeight;
        this.listingColumns = [];
        this.listingRows = [];
        this.defaultWidth = 175;
        this.defaultHeight = 150;
        this.columns = Math.floor(totalWidth / this.defaultWidth);
        this.rows = Math.floor(totalHeight / this.defaultHeight);
        this.width = (totalWidth / this.columns);
        this.height = (totalHeight / this.rows);
        this.onScreenRows = totalHeight / this.height;
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
        var row = ListingGrid.grid.findListingRow(index);
        ListingGrid.grid.insertOrCreate(listing, row, ListingGrid.grid.listingRows);
    };
    ListingGrid.prototype.addListingToColumn = function (listing, index) {
        var column = ListingGrid.grid.findListingColumn(index);
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
    ListingGrid.prototype.addListingsAnimated = function (listings, duration) {
        if (duration === void 0) { duration = 150; }
        listings.map(ListingGrid.grid.setPositionStartAndEnd);
        var timeout = 3500;
        if (ListingGrid.intervalId) {
            clearInterval(ListingGrid.intervalId);
            timeout = 0;
        }
        setTimeout(function () {
            ListingGrid.grid.beginPlacement(listings, duration, (ListingGrid.grid.onScreenRows + 2) * ListingGrid.grid.columns);
        }, timeout);
    };
    ListingGrid.prototype.setPositionStartAndEnd = function (listing, index) {
        var startTop = 0; //(ListingGrid.grid.totalHeight - ListingGrid.grid.height) / 2;
        var startLeft = 0; //(ListingGrid.grid.totalWidth - ListingGrid.grid.width) / 2;
        var finalTop = ListingGrid.grid.findListingRow(index) * ListingGrid.grid.height;
        var finalLeft = ListingGrid.grid.findListingColumn(index) * ListingGrid.grid.width;
        listing.position = new ListingPositionAnimated(startTop, startLeft, finalTop, finalLeft);
    };
    ListingGrid.prototype.findListingColumn = function (index) {
        return index % ListingGrid.grid.columns;
    };
    ListingGrid.prototype.findListingRow = function (index) {
        return Math.floor(index / ListingGrid.grid.columns);
    };
    ListingGrid.prototype.beginPlacement = function (listings, duration, onScreen) {
        var interval = 25;
        var easingFn = new easings_1.Easings("easeIn");
        var currentTime = 0;
        var currentIndex = 0;
        var offScreenListings = listings.slice(onScreen, listings.length);
        var onScreenListings = listings.slice(0, onScreen);
        // SET ALL THE LISTINGS THAT WOULD END UP OFSCREEN TO END POSITION INITIALLY
        offScreenListings.map(function (listing, index, listings) {
            listing.position.top = listing.position.end.top;
            listing.position.left = listing.position.end.left;
            listing.position.opacity = 1;
        });
        // ANIMATE IN ALL THE INITIALLY VISIBLE LISTINGS
        ListingGrid.intervalId = setInterval(function () {
            currentIndex = Math.floor(currentTime / duration);
            currentTime += interval;
            if (currentIndex < onScreenListings.length) {
                var timeOffset = ListingGrid.timeOffset(currentIndex, duration);
                var individualTime = currentTime - timeOffset;
                var newTop = easingFn(individualTime, listings[currentIndex].position.start.top, listings[currentIndex].position.getChange().top, duration);
                var newLeft = easingFn(individualTime, listings[currentIndex].position.start.left, listings[currentIndex].position.getChange().left, duration);
                // onScreenListings[currentIndex].position.opacity = easingFn(individualTime, 0, 1, duration)
                onScreenListings[currentIndex].position.top = newTop;
                onScreenListings[currentIndex].position.left = newLeft;
                if (individualTime == duration) {
                    for (var i = currentIndex + 1; i < onScreenListings.length; i++) {
                        onScreenListings[i].position.start.top = newTop;
                        onScreenListings[i].position.start.left = newLeft;
                        onScreenListings[i].position.top = newTop;
                        onScreenListings[i].position.left = newLeft;
                    }
                }
            }
            else {
                clearInterval(ListingGrid.intervalId);
            }
        }, interval);
    };
    ListingGrid.timeOffset = function (index, duration) {
        var offset = index * duration;
        return offset;
    };
    ListingGrid.indexOffset = function (index) {
        var offset = index * 200; //Math.min(index * 500, 1000)
        return offset;
    };
    return ListingGrid;
})();
exports.ListingGrid = ListingGrid;
var ListingPositionAnimated = (function () {
    function ListingPositionAnimated(startTop, startLeft, finalTop, finalLeft) {
        this.opacity = 1;
        this.setPosition(startTop, startLeft);
        // this.setPosition(finalTop, finalLeft)
        this.start = new ListingPosition(startTop, startLeft);
        this.end = new ListingPosition(finalTop, finalLeft);
    }
    ListingPositionAnimated.prototype.getChange = function () {
        return new ListingPosition(this.end.top - this.start.top, this.end.left - this.start.left);
    };
    ListingPositionAnimated.prototype.setPosition = function (top, left) {
        this.top = top;
        this.left = left;
    };
    return ListingPositionAnimated;
})();
var ListingPosition = (function () {
    function ListingPosition(top, left) {
        this.top = top;
        this.left = left;
    }
    ListingPosition.prototype.setPosition = function (top, left) {
        this.top = top;
        this.left = left;
    };
    return ListingPosition;
})();
//# sourceMappingURL=listingDisplay.js.map