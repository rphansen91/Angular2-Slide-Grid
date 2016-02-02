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
var customizations_service_1 = require('../../customizations/customizations.service');
var ListingGrid = (function () {
    function ListingGrid(_customizations) {
        this._customizations = _customizations;
    }
    ListingGrid.prototype.initialize = function (totalWidth, totalHeight) {
        this.columns = Math.floor(totalWidth / this._customizations.values.cardWidth) || 1;
        this.rows = Math.floor(totalHeight / this._customizations.values.cardHeight) || 1;
        this.width = (totalWidth / this.columns);
        this.height = (totalHeight / this.rows);
    };
    ListingGrid.prototype.getTop = function (index) {
        var row = Math.floor(index / this.columns);
        return row * this.height;
    };
    ListingGrid.prototype.getLeft = function (index) {
        var column = index % this.columns;
        return column * this.width;
    };
    ListingGrid = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [customizations_service_1.Customizations])
    ], ListingGrid);
    return ListingGrid;
})();
exports.ListingGrid = ListingGrid;
//# sourceMappingURL=grid.service.js.map