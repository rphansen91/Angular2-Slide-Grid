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
var http_1 = require("angular2/http");
var ListingParams = (function () {
    function ListingParams(_http) {
        this._http = _http;
        this.url = "https://api.antengo.com";
        this.params = new DefaultParams();
    }
    ListingParams.prototype.runSearch = function () {
        var body = JSON.stringify({ "id": "0", "method": "search_v2", "params": this.params });
        return this._http.post(this.url + "/supplylisting/rpc", body);
    };
    ListingParams.prototype.setSearchParams = function (search) {
        this.params.q = search.q;
        this.params.categoryGroupId = search.categoryGroupId;
        this.params.minPrice = search.minPrice;
        this.params.maxPrice = search.maxPrice;
        return this;
    };
    ListingParams.prototype.getNationalShippable = function () {
        this.params.shippable = 1;
        this.params.distanceStart = 0;
        this.params.distance = 5000;
        return this;
    };
    ListingParams.prototype.getLocalListings = function () {
        this.params.shippable = 0;
        this.params.distanceStart = 0;
        this.params.distance = 10;
        return this;
    };
    ListingParams.prototype.increaseSearchRadius = function () {
        this.params.distanceStart = this.params.distance;
        this.params.distance = this.params.distanceStart + 10;
        if (this.params.distanceStart >= 60) {
            this.params.distanceStart = 60;
            this.params.distance = 4800;
        }
        return this;
    };
    ListingParams.prototype.setLocation = function (loc) {
        this.params.latitude = loc.latitude;
        this.params.longitude = loc.longitude;
        return this;
    };
    ListingParams.prototype.setMembershipType = function (type) {
        this.params.membershipType = type;
        return this;
    };
    ListingParams = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListingParams);
    return ListingParams;
})();
exports.ListingParams = ListingParams;
var DefaultParams = (function () {
    function DefaultParams() {
        this.q = "";
        this.categoryGroupId = 0;
        this.minPrice = 0;
        this.maxPrice = 0;
        this.distanceStart = 0;
        this.distance = 0;
        this.longitude = 0;
        this.latitude = 0;
        this.shippable = 0;
        this.membershipType = 5;
        this.dataSourceId = 0;
        this.categoryId = 0;
        this.page = 1;
        this.hasPhoto = true;
    }
    DefaultParams.prototype.get = function () {
        return this;
    };
    return DefaultParams;
})();
var SearchParams = (function () {
    function SearchParams(q, categoryGroupId, minPrice, maxPrice) {
        if (q === void 0) { q = ""; }
        if (categoryGroupId === void 0) { categoryGroupId = 0; }
        if (minPrice === void 0) { minPrice = 0; }
        if (maxPrice === void 0) { maxPrice = 0; }
        this.q = "";
        this.categoryGroupId = 0;
        this.minPrice = 0;
        this.maxPrice = 0;
        this.q = q;
        this.categoryGroupId = categoryGroupId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
    return SearchParams;
})();
exports.SearchParams = SearchParams;
var ListingLocation = (function () {
    function ListingLocation(lat, lng) {
        this.latitude = lat;
        this.longitude = lng;
    }
    ListingLocation.prototype.isEqual = function (location) {
        return (location.latitude == this.latitude && location.longitude == this.latitude);
    };
    return ListingLocation;
})();
exports.ListingLocation = ListingLocation;
//# sourceMappingURL=listingParams.js.map