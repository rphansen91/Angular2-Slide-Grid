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
var SlideItems = (function () {
    function SlideItems() {
    }
    SlideItems.prototype.initialize = function () {
        // this._allSlidesWorker = (window["Worker"]) ? new window["Worker"]("./app/workers/allSlidesWorker.js") : false;
        this._allSlidesWorker = (window["Worker"]) ? new window["Worker"]("./app/workers/formatAllListings.js") : false;
    };
    SlideItems.prototype.addAll = function (listings, grid) {
        var work = this;
        return new Promise(function (resolve, reject) {
            if (work._allSlidesWorker) {
                work._allSlidesWorker.postMessage([listings, grid]);
                work._allSlidesWorker.onmessage = function (e) {
                    resolve(e.data[0]);
                };
            }
        });
    };
    SlideItems = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SlideItems);
    return SlideItems;
})();
exports.SlideItems = SlideItems;
//# sourceMappingURL=slideItems.js.map