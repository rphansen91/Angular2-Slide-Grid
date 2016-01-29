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
var angular2_1 = require('angular2/angular2');
var http_1 = require("angular2/http");
var listingParams_1 = require('./listings/listingParams');
var partners_service_1 = require('./partners/partners.service');
var listingDisplay_1 = require("./display/listingDisplay");
var callToAction_1 = require("./callToAction");
var slowScroll_1 = require("./slowScroll");
// import {OffsetBlocks} from "./display/offsetBlocks"
var AntengoWidget = (function () {
    function AntengoWidget(partnersService, listingParams, element) {
        this.partnersService = partnersService;
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
            .map(function (res) { return res.json().result.rs; })
            .subscribe(function (listings) {
            AntengoWidget.display.listings = listings; //.splice(0, res.result.rs.length - (res.result.rs.length % AntengoWidget.display.grid.columns))
            AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow);
            slowScroll_1.SlowScrollInterval.getInstance().start();
        });
        partnersService.initialize();
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
            providers: [listingParams_1.ListingParams, partners_service_1.PartnersService, angular2_1.ElementRef]
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
        __param(2, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [partners_service_1.PartnersService, listingParams_1.ListingParams, angular2_1.ElementRef])
    ], AntengoWidget);
    return AntengoWidget;
})();
angular2_1.bootstrap(AntengoWidget, [http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=antengoWidget.js.map