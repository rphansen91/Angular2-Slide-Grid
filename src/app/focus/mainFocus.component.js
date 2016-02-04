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
var customizations_service_1 = require('../customizations/customizations.service');
var focus_service_1 = require('./focus.service');
var price_1 = require('../display/listing/price');
var opener_component_1 = require('./opener/opener.component');
var slidePositions_1 = require('../display/slide/slidePositions');
var partners_service_1 = require('../partners/partners.service');
var easings_1 = require('./easings');
var MainFocus = (function () {
    function MainFocus(focus, _customizations, _slidePositions, _partnersService) {
        this.focus = focus;
        this._customizations = _customizations;
        this._slidePositions = _slidePositions;
        this._partnersService = _partnersService;
        this.color = "";
        this.position = "";
        this.interval = new ImageInterval();
    }
    MainFocus.prototype.onInit = function () {
        this.color = this._customizations.values.colors[0];
    };
    MainFocus.prototype.openListing = function () {
        var code = this._partnersService.partner;
        window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.focus.listing.id);
    };
    MainFocus.prototype.removeFocus = function () {
        this.endShow();
        this.focus.hide();
    };
    MainFocus.prototype.startShow = function () {
        var _this = this;
        if (this.focus.listing.slide.length > 1) {
            var index = this.focus.listing.slide.length - 2;
            this.interval.config(500, "easeIn");
            this.interval.resetValue();
            this.interval.startInterval(function () {
                var finished = false;
                _this.position = _this._slidePositions.getPosition(_this.interval.value, index, _this.focus.listing.width);
                _this.interval.increaseValue();
                if (_this.interval.value > 100) {
                    index--;
                    _this.interval.resetValue();
                }
                if (index < 0) {
                    _this.endShow();
                }
            });
        }
        else {
            this.setDefaultImagePosition();
        }
    };
    MainFocus.prototype.endShow = function () {
        this.setDefaultImagePosition();
        if (this.interval) {
            this.interval.stopInterval();
        }
    };
    MainFocus.prototype.setDefaultImagePosition = function () {
        this.position = this._slidePositions.getPosition(100, 0, this.focus.listing.width);
    };
    MainFocus = __decorate([
        angular2_1.Component({
            selector: "main-focus",
            styleUrls: ["./app/display/listing/listing.css"],
            pipes: [price_1.PriceDisplay],
            directives: [angular2_1.NgIf, opener_component_1.Opener],
            template: "\n\t\t<div *ng-if=\"focus.active && focus.listing\" class=\"listingDisplay\" \n\t\t\t[style.width]=\"focus.listing.width\" \n\t\t\t[style.height]=\"focus.listing.height\"\n\t\t\t[style.top]=\"focus.listing.top\"\n\t\t\t[style.left]=\"focus.listing.left\"\n\t\t\t[style.background-image]=\"focus.listing.slide.image\" \n\t\t\t[style.background-position]=\"position\"\n\t\t\t(click)=\"openListing()\"\n\t\t\t(mouseenter)=\"startShow()\"\n\t\t\t(mouseleave)=\"removeFocus()\">\n\t\t\t\n\t\t\t<opener [id]=\"focus.listing.id\"></opener>\n\n\t\t\t<div class=\"sold\" *ng-if=\"focus.listing.status == 2\"></div>\t\n\t\t\t<div class=\"price\" *ng-if=\"focus.listing.price\" [style.background-color]=\"color\">$ {{focus.listing.price | price}}</div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [focus_service_1.FocusService, customizations_service_1.Customizations, slidePositions_1.SlidePositions, partners_service_1.PartnersService])
    ], MainFocus);
    return MainFocus;
})();
exports.MainFocus = MainFocus;
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
        if (this.id) {
            clearInterval(this.id);
        }
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
//# sourceMappingURL=mainFocus.component.js.map