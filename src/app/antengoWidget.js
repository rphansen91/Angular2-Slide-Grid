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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
// import {HTTP_PROVIDERS} from "/angular2/http";
var listingParams_1 = require('./listings/listingParams');
var httpService_1 = require("./listings/httpService");
var listingDisplay_1 = require("./display/listingDisplay");
var callToAction_1 = require("./callToAction");
var slideShow_1 = require("./display/slideShow");
var AntengoWidget = (function () {
    function AntengoWidget(listingParams, element) {
        this.listingParams = listingParams;
        this.element = element;
        this.ctaImage = "./app/assets/callToAction.png";
        this.ctaHidden = false;
        this.width = this.element.nativeElement.clientWidth;
        this.height = this.element.nativeElement.clientHeight;
        this.grid = new listingDisplay_1.ListingGrid(this.width, this.height);
        var display = this;
        var location = new listingParams_1.ListingLocation(34, -117);
        display.listingParams
            .setLocation(location)
            .getNationalShippable()
            .runSearch()
            .onResponse(function (res) {
            display.listings = res.result.rs; //.splice(0, display.grid.columns * display.grid.rows);
            setTimeout(function () {
                slideShow_1.SlideItems.getInstance().startShow();
            }, 2000);
        })
            .onError(function (err) {
            console.log(err);
        });
    }
    AntengoWidget.prototype.showCTA = function () {
        // this.slideItems.stopShow()
        slideShow_1.SlideItems.getInstance().startShow();
        this.ctaHidden = false;
    };
    AntengoWidget.prototype.hideCTA = function () {
        // this.slideItems.stopShow()
        slideShow_1.SlideItems.getInstance().stopShow();
        this.ctaHidden = true;
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], AntengoWidget.prototype, "ctaImage");
    AntengoWidget = __decorate([
        angular2_1.Component({
            selector: 'antengo-listings',
            providers: [httpService_1.HttpHelper, listingParams_1.ListingParams, slideShow_1.SlideItems, angular2_1.ElementRef],
            inputs: ["main-image: ctaImage"]
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, angular2_1.NgIf, listingDisplay_1.ListingDisplay, callToAction_1.CallToAction],
            styles: [
                '.widgetContainer {width:100%; height: 100%;background-color: rgba(174, 146, 204, 0.8);}',
                '.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll;}',
                '.scrollingContainer::-webkit-scrollbar{display:none;}'
            ],
            template: "\t\n\t\t<div class=\"widgetContainer\" (mouseleave)=\"showCTA()\" (mouseenter)=\"hideCTA()\">\n\t\t\t<call-to-action [hidden]=\"ctaHidden\" [image]=\"ctaImage\"></call-to-action>\n\t\t\t<div class=\"scrollingContainer\">\n\t\t\t\t<listing-display *ng-for=\"#listing of listings\" [listing]=\"listing\" [width]=\"grid.width\" [height]=\"grid.height\"></listing-display>\n\t\t\t</div>\n\t\t</div>\n\t"
        }),
        __param(1, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [listingParams_1.ListingParams, (typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], AntengoWidget);
    return AntengoWidget;
})();
angular2_1.bootstrap(AntengoWidget);
//# sourceMappingURL=antengoWidget.js.map