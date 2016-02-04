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
var listingStore_1 = require('./listings/listingStore');
var listingParams_1 = require('./listings/listingParams');
var partners_service_1 = require('./partners/partners.service');
var listing_component_1 = require("./display/listing/listing.component");
var grid_service_1 = require("./display/grid/grid.service");
var callToAction_1 = require("./callToAction");
var sell_component_1 = require("./sell/sell.component");
var slowScroll_1 = require("./slowScroll");
var slideItems_1 = require("./display/slide/slideItems");
var slidePositions_1 = require('./display/slide/slidePositions');
var loader_component_1 = require("./loader/loader.component");
var loader_instance_1 = require("./loader/loader.instance");
var focus_component_1 = require("./focus/focus.component");
var focus_service_1 = require("./focus/focus.service");
var AntengoWidget = (function () {
    function AntengoWidget(partnersService, slideItems, listingGrid, listingStore, customizations, loader, focus, element) {
        var _this = this;
        this.partnersService = partnersService;
        this.slideItems = slideItems;
        this.listingGrid = listingGrid;
        this.listingStore = listingStore;
        this.customizations = customizations;
        this.loader = loader;
        this.focus = focus;
        this.element = element;
        this.showSell = false;
        this.MAX_LISTINGS = 300;
        this.customizations.initialize();
        this.color = this.customizations.values.colors[0];
        this.fontUrl = this.customizations.values.fontUrl;
        this.listingStore.initialize()
            .subscribe(function (listings) {
            _this.setListings(listings);
        });
        partnersService.initialize();
        slideItems.initialize();
        this.setSizes();
        window.onresize = function () { _this.setSizes(); };
    }
    AntengoWidget.prototype.setListings = function (listings) {
        var _this = this;
        listings = listings.splice(0, this.MAX_LISTINGS - (this.MAX_LISTINGS % this.listingGrid.columns));
        this.listingStore.clearVisible();
        this.slideItems.addAll(listings, this.listingGrid)
            .then(function (_listings) {
            _this.listingStore.setAll(_listings);
            _this.listingStore.appendToVisible(_this.listingGrid.addListingCount());
            _this.loader.stop();
            slowScroll_1.SlowScrollInterval.getInstance().start();
        });
    };
    AntengoWidget.prototype.setSizes = function () {
        this.loader.start();
        this.width = this.element.nativeElement.clientWidth;
        this.height = this.element.nativeElement.clientHeight;
        this.listingGrid.initialize(this.width, this.height);
        if (this.listingStore.visible.length) {
            this.setListings(this.listingStore.visible.concat(this.listingStore.all));
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
    AntengoWidget.prototype.elementScroll = function (_a) {
        var target = _a.target;
        var scrollHeight = target.scrollHeight;
        var scrollTop = target.scrollTop;
        var offset = this.listingGrid.height;
        if (this.focus.active) {
            this.focus.hide();
        }
        if (scrollTop + offset + this.height > scrollHeight) {
            this.listingStore.appendToVisible(this.listingGrid.addListingCount());
        }
    };
    AntengoWidget = __decorate([
        angular2_1.Component({
            selector: 'antengo-listings',
            providers: [partners_service_1.PartnersService, listingStore_1.ListingStore, grid_service_1.ListingGrid, angular2_1.ElementRef, focus_service_1.FocusService],
            directives: [angular2_1.NgFor, angular2_1.NgIf, listing_component_1.ListingDisplay, callToAction_1.CallToAction, slowScroll_1.SlowScroll, loader_component_1.WidgetLoader, sell_component_1.SellButton, focus_component_1.FocusControl],
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
        __param(7, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [partners_service_1.PartnersService, slideItems_1.SlideItems, grid_service_1.ListingGrid, listingStore_1.ListingStore, customizations_service_1.Customizations, loader_instance_1.WidgetLoaderInstance, focus_service_1.FocusService, angular2_1.ElementRef])
    ], AntengoWidget);
    return AntengoWidget;
})();
angular2_1.bootstrap(AntengoWidget, [
    http_1.HTTP_PROVIDERS,
    listingParams_1.ListingParams,
    loader_instance_1.WidgetLoaderInstance,
    slideItems_1.SlideItems,
    slidePositions_1.SlidePositions,
    customizations_service_1.Customizations
]);
//# sourceMappingURL=antengoWidget.js.map