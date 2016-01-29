var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var worker_1 = require('angular2/web_worker/worker');
// import {HTTP_PROVIDERS} from "/angular2/http";
var listingParams_1 = require('./listings/listingParams');
var httpService_1 = require("./listings/httpService");
var listingDisplay_1 = require("./display/listingDisplay");
var callToAction_1 = require("./callToAction");
var slowScroll_1 = require("./slowScroll");
var loadingDots_1 = require("./loadingDots");
var AntengoWidget = (function () {
    function AntengoWidget(listingParams, element, renderer) {
        this.listingParams = listingParams;
        this.element = element;
        this.renderer = renderer;
        this.width = 500;
        this.height = 500;
        this.listings = [];
        this.columnOrRow = "row";
        this.ctaHasBeenHidden = false;
        this.ctaTimeout = 6000;
    }
    AntengoWidget.prototype.onInit = function () {
        var _this = this;
        this.setSizes();
        var location = new listingParams_1.ListingLocation(34, -117);
        var query = new listingParams_1.SearchParams("car");
        // AntengoWidget.display.listings = listingParams.getMockData()
        // AntengoWidget.display.grid.addListingsAnimated(AntengoWidget.display.listings)
        this.listingParams
            .setLocation(location)
            .getNationalShippable()
            .runSearch()
            .onResponse(function (res) {
            _this.listings = res.result.rs.splice(0, 500);
            console.log(_this.listings, _this.grid);
            // this.grid.addListings(this.listings)
            // AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
            // SlowScrollInterval.getInstance().start()
        })
            .onError(function (err) {
            console.log(err);
        });
        // window.onresize = this.setSizes;
    };
    AntengoWidget.prototype.setSizes = function () {
        // this.width = this.element.nativeElement.clientWidth;
        // this.height = this.element.nativeElement.clientHeight;
        // this.renderer.setElementStyle()
        this.grid = new listingDisplay_1.ListingGrid(this.width, this.height);
        // if (this.listings.length) {
        // 	this.grid.addListings(this.listings)
        // //AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
        // }
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
        worker_1.Component({
            selector: 'antengo-listings',
            providers: [httpService_1.HttpHelper, listingParams_1.ListingParams, worker_1.ElementRef, worker_1.Renderer]
        }),
        worker_1.View({
            directives: [worker_1.NgFor, worker_1.NgIf, listingDisplay_1.ListingDisplay, callToAction_1.CallToAction, slowScroll_1.SlowScroll, loadingDots_1.LoadingDots],
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
        __param(1, worker_1.Inject(worker_1.ElementRef)),
        __param(2, worker_1.Inject(worker_1.Renderer)), 
        __metadata('design:paramtypes', [listingParams_1.ListingParams, worker_1.ElementRef, worker_1.Renderer])
    ], AntengoWidget);
    return AntengoWidget;
})();
worker_1.bootstrapWebWorker(AntengoWidget);
//# sourceMappingURL=antengoWidget.js.map