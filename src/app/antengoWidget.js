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
var slowScroll_1 = require("./slowScroll");
// import {OffsetBlocks} from "./display/offsetBlocks"
var AntengoWidget = (function () {
    function AntengoWidget(listingParams, element) {
        this.listingParams = listingParams;
        this.element = element;
        this.listings = [];
        this.columnOrRow = "row";
        this.ctaHasBeenHidden = false;
        this.ctaTimeout = 6000;
        AntengoWidget.display = this;
        AntengoWidget.display.setSizes();
        var location = new listingParams_1.ListingLocation(34, -117);
        var query = new listingParams_1.SearchParams("car");
        AntengoWidget.display.listingParams
            .setLocation(location)
            .getNationalShippable()
            .runSearch()
            .onResponse(function (res) {
            AntengoWidget.display.listings = res.result.rs; //.splice(0, res.result.rs.length - (res.result.rs.length % AntengoWidget.display.grid.columns))
            AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow);
            slowScroll_1.SlowScrollInterval.getInstance().start();
        })
            .onError(function (err) {
            console.log(err);
        });
        window.onresize = this.setSizes;
    }
    AntengoWidget.prototype.setSizes = function () {
        AntengoWidget.display.width = AntengoWidget.display.element.nativeElement.clientWidth;
        AntengoWidget.display.height = AntengoWidget.display.element.nativeElement.clientHeight;
        AntengoWidget.display.grid = new listingDisplay_1.ListingGrid(AntengoWidget.display.width, AntengoWidget.display.height);
        AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow);
    };
    AntengoWidget.prototype.showCTA = function () {
        slowScroll_1.SlowScrollInterval.getInstance().start();
        callToAction_1.CallToActionControl.getInstance().show();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    };
    AntengoWidget.prototype.hideCTA = function () {
        if (this.ctaHasBeenHidden) {
            this.timeoutId = 0;
            slowScroll_1.SlowScrollInterval.getInstance().stop();
            callToAction_1.CallToActionControl.getInstance().hide();
        }
        else {
            this.ctaHasBeenHidden = true;
            this.timeoutId = setTimeout(function () {
                slowScroll_1.SlowScrollInterval.getInstance().stop();
                callToAction_1.CallToActionControl.getInstance().hide();
            }, this.ctaTimeout);
        }
    };
    AntengoWidget.prototype.hideCTAMobile = function () {
        this.timeoutId = 0;
        this.ctaHasBeenHidden = true;
        callToAction_1.CallToActionControl.getInstance().hide();
        slowScroll_1.SlowScrollInterval.getInstance().stop();
    };
    AntengoWidget = __decorate([
        angular2_1.Component({
            selector: 'antengo-listings',
            providers: [httpService_1.HttpHelper, listingParams_1.ListingParams, angular2_1.ElementRef]
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, angular2_1.NgIf, listingDisplay_1.ListingDisplay, callToAction_1.CallToAction, slowScroll_1.SlowScroll],
            styles: [
                '.widgetContainer {width:100%; height: 100%;background-color: rgba(174, 146, 204, 0.8);-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;-webkit-user-select: none;}',
                '.listingsColumn {position: relative; float: left; height: 100%; overflow-x: hidden; overflow-y: auto; scroll; -webkit-overflow-scrolling: touch;}',
                '.listingsColumn::-webkit-scrollbar{display:none;}',
                '.listingsRow {position: relative; width: 100%;}',
                '.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;}',
                '.scrollingContainer::-webkit-scrollbar{display:none;}',
                '.offset {position: relative; float: left;}'
            ],
            templateUrl: './app/widget.html'
        }),
        __param(1, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [listingParams_1.ListingParams, (typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], AntengoWidget);
    return AntengoWidget;
})();
angular2_1.bootstrap(AntengoWidget);
//# sourceMappingURL=antengoWidget.js.map