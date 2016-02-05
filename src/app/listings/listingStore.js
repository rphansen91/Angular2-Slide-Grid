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
var angular2_1 = require("angular2/angular2");
var listingParams_1 = require('./listingParams');
var customizations_service_1 = require('../customizations/customizations.service');
var ListingStore = (function () {
    function ListingStore(_listingParams, _customizations) {
        this._listingParams = _listingParams;
        this._customizations = _customizations;
        this.MAX_LISTINGS = 300;
        this.all = [];
        this.visible = [];
    }
    ListingStore.prototype.initialize = function () {
        var location = new listingParams_1.ListingLocation(34, -117);
        var search = new listingParams_1.SearchParams("", this._customizations.values.categoryId);
        return this._listingParams
            .setLocation(location)
            .setSearchParams(search)
            .getNationalShippable()
            .runSearch()
            .map(function (res) { return res.json().result.rs; });
    };
    ListingStore.prototype.setAll = function (listings) {
        this.all = listings;
    };
    ListingStore.prototype.clearVisible = function () {
        this.visible = [];
    };
    ListingStore.prototype.appendToVisible = function (count) {
        this.visible = this.visible.concat(this.all.splice(0, count));
    };
    ListingStore = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [listingParams_1.ListingParams, customizations_service_1.Customizations])
    ], ListingStore);
    return ListingStore;
})();
exports.ListingStore = ListingStore;
//# sourceMappingURL=listingStore.js.map