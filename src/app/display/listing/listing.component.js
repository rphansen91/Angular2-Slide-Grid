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
var slideItems_1 = require('../slide/slideItems');
var slidePositions_1 = require('../slide/slidePositions');
var price_1 = require('./price');
var partners_service_1 = require('../../partners/partners.service');
var easings_1 = require('../easings');
var opener_component_1 = require('../opener/opener.component');
var blur_component_1 = require('../../blur.component');
var grid_service_1 = require('../grid/grid.service');
var ListingDisplay = (function () {
    function ListingDisplay(_slideItems, _slidePositions, _partnersService, _customizations, _blurService, _listingGrid) {
        this._slideItems = _slideItems;
        this._slidePositions = _slidePositions;
        this._partnersService = _partnersService;
        this._customizations = _customizations;
        this._blurService = _blurService;
        this._listingGrid = _listingGrid;
        this.showControls = false;
        this.opening = false;
        this.isRunning = false;
    }
    ListingDisplay.prototype.onInit = function () {
        this.slide = this.listing.slide;
        this.position = this.listing.position;
        this.color = this._customizations.values.colors[0];
        // this.listing.slidePromise
        // .then((slide) => { this.slide = slide; })
        // .then(() => { 
        // 	return this._slidePositions.getPosition(100, this.slide.length - 1, this.width)
        // })
        // .then((position) => {
        // 	this.position = position; 
        // })
    };
    ListingDisplay.prototype.goToApp = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
        this.opening = false;
    };
    ListingDisplay.prototype.debounceStart = function () {
        var _this = this;
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(function () { _this.startSolo(); }, 300);
    };
    ListingDisplay.prototype.startSolo = function () {
        var listing = this;
        this.setOpenStyles();
        this._blurService.show();
        this.id = setTimeout(function () {
            listing.start();
        }, 200);
    };
    ListingDisplay.prototype.endSolo = function () {
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.setCloseStyles();
        this._blurService.hide();
        clearTimeout(this.id);
        this.stop();
    };
    ListingDisplay.prototype.start = function () {
        this.showControls = true;
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
                    show.position = show._slidePositions.getPosition(show.interval.value, index, show.width);
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
        this.isRunning = false;
        this.position = this._slidePositions.getPosition(100, this.slide.length - 1, this.width);
        this.showControls = false;
        if (this.interval) {
            this.interval.stopInterval();
        }
    };
    ListingDisplay.prototype.setOpenStyles = function () {
        this.opening = true;
        this.tmp = {
            top: this.top,
            left: this.left,
            height: this.height,
            width: this.width
        };
        if (this.top != 0) {
            this.top = this.top - (this.height * 0.15);
        }
        if (this.left != 0) {
            if (this.left < ((this._listingGrid.columns - 1) * this._listingGrid.width)) {
                this.left = this.left - (this.width * 0.15);
            }
            else {
                this.left = this.left - (this.width * 0.3);
            }
        }
        this.height = this.height * 1.3;
        this.width = this.width * 1.3;
    };
    ListingDisplay.prototype.setCloseStyles = function () {
        this.opening = false;
        if (this.tmp) {
            this.top = this.tmp.top;
            this.left = this.tmp.left;
            this.height = this.tmp.height;
            this.width = this.tmp.width;
        }
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
            directives: [angular2_1.NgIf, opener_component_1.Opener],
            styles: [
                '.listingDisplay {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
                '.opening {z-index: 3;}',
                '.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;}',
                '.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
            ],
            template: "\n\t\t<div *ng-if=\"slide\" class=\"listingDisplay\" \n\t\t\t[class.opening]=\"opening\" \n\t\t\t[style.width]=\"width\" \n\t\t\t[style.height]=\"height\"\n\t\t\t[style.top]=\"top\"\n\t\t\t[style.left]=\"left\"\n\t\t\t[style.background-position]=\"position\" \n\t\t\t[style.background-image]=\"slide.image\" \n\t\t\t(click)=\"goToApp()\" \n\t\t\t(mouseenter)=\"debounceStart()\" \n\t\t\t(mouseleave)=\"endSolo()\" \n\t\t\t(touchstart)=\"startSolo()\" \n\t\t\t(touchend)=\"endSolo()\">\n\n\t\t\t<opener [show]=\"showControls\" [id]=\"listing.id\"></opener>\n\t\t\t\n\t\t\t<div class=\"sold\" *ng-if=\"listing.status == 2\"></div>\t\n\t\t\t<div class=\"price\" *ng-if=\"listing.price\" [style.background-color]=\"color\">$ {{listing.price | price}}</div>\n\t\t\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [slideItems_1.SlideItems, slidePositions_1.SlidePositions, partners_service_1.PartnersService, customizations_service_1.Customizations, blur_component_1.BlurService, grid_service_1.ListingGrid])
    ], ListingDisplay);
    return ListingDisplay;
})();
exports.ListingDisplay = ListingDisplay;
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
//# sourceMappingURL=listing.component.js.map