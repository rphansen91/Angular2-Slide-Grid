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
var http_1 = require("angular2/http");
var customizations_service_1 = require('./customizations/customizations.service');
var listingParams_1 = require('./listings/listingParams');
var partners_service_1 = require('./partners/partners.service');
var listing_component_1 = require("./display/listing/listing.component");
var grid_service_1 = require("./display/grid/grid.service");
var callToAction_1 = require("./callToAction");
var sellIt_component_1 = require("./sellIt.component");
var slowScroll_1 = require("./slowScroll");
var slideItems_1 = require("./display/slide/slideItems");
var slidePositions_1 = require('./display/slide/slidePositions');
var loader_component_1 = require("./loader/loader.component");
var loader_instance_1 = require("./loader/loader.instance");
var AntengoWidget = (function () {
    function AntengoWidget(partnersService, listingParams, slideItems, listingGrid, customizations, loader, element) {
        this.partnersService = partnersService;
        this.listingParams = listingParams;
        this.slideItems = slideItems;
        this.listingGrid = listingGrid;
        this.customizations = customizations;
        this.loader = loader;
        this.element = element;
        this.listings = [];
        this.showSell = false;
        this.MAX_LISTINGS = 300;
        this.customizations.initialize();
        this.color = this.customizations.values.colors[0];
        this.fontUrl = this.customizations.values.fontUrl;
        AntengoWidget.display = this;
        var location = new listingParams_1.ListingLocation(34, -117);
        var query = new listingParams_1.SearchParams("car");
        AntengoWidget.display.listingParams
            .setLocation(location)
            .getNationalShippable()
            .runSearch()
            .map(function (res) { return res.json().result.rs; })
            .subscribe(this.setListings);
        partnersService.initialize();
        slideItems.initialize();
        AntengoWidget.display.setSizes();
        window.onresize = this.setSizes;
    }
    AntengoWidget.prototype.setListings = function (listings) {
        listings = listings.splice(0, AntengoWidget.display.MAX_LISTINGS - (AntengoWidget.display.MAX_LISTINGS % AntengoWidget.display.listingGrid.columns));
        AntengoWidget.display.slideItems.addAll(listings, AntengoWidget.display.listingGrid)
            .then(function (_listings) {
            AntengoWidget.display.listings = _listings;
            AntengoWidget.display.loader.stop();
            slowScroll_1.SlowScrollInterval.getInstance().start();
        });
    };
    AntengoWidget.prototype.setSizes = function () {
        AntengoWidget.display.loader.start();
        AntengoWidget.display.width = AntengoWidget.display.element.nativeElement.clientWidth;
        AntengoWidget.display.height = AntengoWidget.display.element.nativeElement.clientHeight;
        console.log(AntengoWidget.display.width, AntengoWidget.display.height);
        AntengoWidget.display.listingGrid.initialize(AntengoWidget.display.width, AntengoWidget.display.height);
        if (AntengoWidget.display.listings.length) {
            AntengoWidget.display.setListings(AntengoWidget.display.listings);
        }
    };
    AntengoWidget.prototype.showCTA = function () {
        slowScroll_1.SlowScrollInterval.getInstance().start();
        callToAction_1.CallToActionControl.getInstance().show();
        this.showSell = false;
    };
    AntengoWidget.prototype.hideCTA = function () {
        slowScroll_1.SlowScrollInterval.getInstance().stop();
        callToAction_1.CallToActionControl.getInstance().hide();
        this.showSell = true;
    };
    AntengoWidget = __decorate([
        angular2_1.Component({
            selector: 'antengo-listings',
            providers: [listingParams_1.ListingParams, partners_service_1.PartnersService, angular2_1.ElementRef, grid_service_1.ListingGrid],
            directives: [angular2_1.NgFor, angular2_1.NgIf, listing_component_1.ListingDisplay, callToAction_1.CallToAction, slowScroll_1.SlowScroll, loader_component_1.WidgetLoader, sellIt_component_1.SellIt],
            styles: [
                '.widgetContainer {position: absolute; top: 0; bottom: 0; left: 0; right: 0;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;-webkit-user-select: none;}',
                '.listingsRow {position: relative; width: 100%;}',
                '.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;}',
                '.scrollingContainer::-webkit-scrollbar {background-color: #fff!important; width: 12px;}',
                '.scrollingContainer::-webkit-scrollbar-thumb {background-color: #ccc;}',
                '.offset {position: relative; float: left;}'
            ],
            templateUrl: './app/widget.html'
        }),
        __param(6, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [partners_service_1.PartnersService, listingParams_1.ListingParams, slideItems_1.SlideItems, grid_service_1.ListingGrid, customizations_service_1.Customizations, loader_instance_1.WidgetLoaderInstance, angular2_1.ElementRef])
    ], AntengoWidget);
    return AntengoWidget;
})();
angular2_1.bootstrap(AntengoWidget, [
    http_1.HTTP_PROVIDERS,
    loader_instance_1.WidgetLoaderInstance,
    slideItems_1.SlideItems,
    slidePositions_1.SlidePositions,
    customizations_service_1.Customizations
]);
//# sourceMappingURL=antengoWidget.js.map