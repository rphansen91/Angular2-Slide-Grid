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
var slidePositions_1 = require('./slidePositions');
var price_1 = require('./price');
var partners_service_1 = require('../partners/partners.service');
var easings_1 = require('./easings');
var ListingDisplay = (function () {
    function ListingDisplay(_slideItems, _slidePositions, _partnersService) {
        this._slideItems = _slideItems;
        this._slidePositions = _slidePositions;
        this._partnersService = _partnersService;
        this.opening = false;
        this.isRunning = false;
    }
    ListingDisplay.prototype.onInit = function () {
        var _this = this;
        this._slideItems.add(this.listing.photos, this.width)
            .then(function (slide) { _this.slide = slide; })
            .then(function () {
            return _this._slidePositions.getPosition(100, _this.slide.length - 1, _this.width);
        })
            .then(function (position) {
            _this.position = position;
        });
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
            listing.start();
        }, 200);
    };
    ListingDisplay.prototype.endSolo = function () {
        this.opening = false;
        clearTimeout(this.id);
        this.stop();
    };
    ListingDisplay.prototype.start = function () {
        if (this.slide.length > 1) {
            var show = this;
            var index = this.slide.length - 2;
            if (!show.isRunning) {
                show.isRunning = true;
                show.interval = new ImageInterval();
                show.interval.config(500, "easeIn");
                show.interval.resetValue();
                show.interval.startInterval(function () {
                    var finished = false;
                    show.interval.increaseValue();
                    show._slidePositions.getPosition(show.interval.value, index, show.width)
                        .then(function (position) { return show.position = position; });
                    if (show.interval.value == 100) {
                        index--;
                        if (index < 0) {
                            finished = true;
                        }
                        else {
                            show.interval.resetValue();
                        }
                    }
                    if (finished) {
                        show.interval.stopInterval();
                    }
                });
            }
        }
    };
    ListingDisplay.prototype.stop = function () {
        var _this = this;
        this.isRunning = false;
        this._slidePositions.getPosition(100, this.slide.length - 1, this.width)
            .then(function (position) { return _this.position = position; });
        if (this.interval) {
            this.interval.stopInterval();
        }
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
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "top");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], ListingDisplay.prototype, "left");
    ListingDisplay = __decorate([
        angular2_1.Component({
            selector: "listing-display",
            inputs: ["listing: listing", "width: width", "height: height"],
            pipes: [price_1.PriceDisplay],
            directives: [angular2_1.NgIf],
            styles: [
                '.listingDisplay {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
                '.opening {-webkit-transform: scale(1.3); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 2;}',
                '.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
                '.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
            ],
            template: "\n\t\t<div *ng-if=\"slide\" class=\"listingDisplay\" \n\t\t\t[class.opening]=\"opening\" \n\t\t\t[style.width]=\"width\" \n\t\t\t[style.height]=\"height\"\n\t\t\t[style.top] = \"top\"\n\t\t\t[style.left] = \"left\"\n\t\t\t[style.background-position]=\"position\" \n\t\t\t[style.background-image]=\"slide.image\" \n\t\t\t(click)=\"goToApp()\" \n\t\t\t(mouseenter)=\"startSolo()\" \n\t\t\t(mouseleave)=\"endSolo()\" \n\t\t\t(touchstart)=\"startSolo()\" \n\t\t\t(touchend)=\"endSolo()\">\n\t\t\t\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\t\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\">$ {{listing.price | price}}</div>\n\t\t\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [slideShow_1.SlideItems, slidePositions_1.SlidePositions, partners_service_1.PartnersService])
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
        ListingGrid.grid = this;
    }
    ListingGrid.prototype.getTop = function (index) {
        var row = Math.floor(index / ListingGrid.grid.columns);
        return row * this.height;
    };
    ListingGrid.prototype.getLeft = function (index) {
        var column = index % ListingGrid.grid.columns;
        return column * this.width;
    };
    return ListingGrid;
})();
exports.ListingGrid = ListingGrid;
var ImageInterval = (function () {
    function ImageInterval() {
        this.value = 0;
        this.currentTime = 0;
        this.startValue = 0;
        this.endValue = 100;
        this.change = 100;
        this.ammount = 100;
    }
    ImageInterval.prototype.config = function (d, t, ammount, start, end) {
        this.duration = d;
        this.type = t;
        this.startValue = (start) ? start : 0;
        this.endValue = (end) ? end : 100;
        this.change = this.endValue - this.startValue;
        this.ammount = (ammount) ? ammount : this.ammount;
        this.interval = this.duration / this.ammount;
        this.easingFn = new easings_1.Easings(this.type);
    };
    ImageInterval.prototype.resetValue = function () {
        this.value = 0;
        this.currentTime = 0;
    };
    ImageInterval.prototype.increaseValue = function () {
        // Fibonacci increase
        this.currentTime += this.interval;
        this.value = this.easingFn(this.currentTime, this.startValue, this.change, this.duration);
    };
    ImageInterval.prototype.startInterval = function (callback) {
        this.id = setInterval(function () {
            callback();
        }, this.interval);
    };
    ImageInterval.prototype.stopInterval = function () {
        clearInterval(this.id);
    };
    return ImageInterval;
})();
exports.ImageInterval = ImageInterval;
//# sourceMappingURL=listingDisplay.js.map