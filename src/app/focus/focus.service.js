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
var grid_service_1 = require("../display/grid/grid.service");
var FocusService = (function () {
    function FocusService(_grid) {
        this._grid = _grid;
        this.active = false;
    }
    FocusService.prototype.activate = function (listing) {
        this.listing = this.getActiveListingValues(listing);
        this.active = true;
    };
    FocusService.prototype.hide = function () {
        this.active = false;
    };
    FocusService.prototype.getActiveListingValues = function (listing) {
        var focused = {};
        Object.keys(listing).map(function (key) { focused[key] = listing[key]; });
        if (focused.top != 0) {
            focused.top = focused.top - (this._grid.height * 0.15);
        }
        if (focused.left != 0) {
            if (focused.left < ((this._grid.columns - 1) * this._grid.width)) {
                focused.left = focused.left - (this._grid.width * 0.15);
            }
            else {
                focused.left = focused.left - (this._grid.width * 0.3);
            }
        }
        focused.height = this._grid.height * 1.3;
        focused.width = this._grid.width * 1.3;
        return focused;
    };
    FocusService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [grid_service_1.ListingGrid])
    ], FocusService);
    return FocusService;
})();
exports.FocusService = FocusService;
//# sourceMappingURL=focus.service.js.map