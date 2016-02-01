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
var slowScroll_1 = require("../slowScroll");
var slideItem_1 = require("./slideItem");
var loader_instance_1 = require("../loader/loader.instance");
var SlideItems = (function () {
    function SlideItems(_loader) {
        this._loader = _loader;
    }
    SlideItems.prototype.initialize = function () {
        this._worker = (window["Worker"]) ? new window["Worker"]("./app/workers/slideWorker.js") : false;
        this._workerResolvers = [];
    };
    SlideItems.prototype.add = function (photos, size) {
        var work = this;
        return new Promise(function (resolve, reject) {
            if (work._worker) {
                work._workerResolvers.push(resolve);
                work._worker.postMessage([photos, size, work._workerResolvers.length - 1]);
                work._worker.onmessage = function (e) {
                    var resolver = work._workerResolvers[e.data[1]];
                    if (e.data[1] >= work._workerResolvers.length - 1) {
                        work._loader.toggle();
                        slowScroll_1.SlowScrollInterval.getInstance().start();
                    }
                    resolver(e.data[0]);
                };
            }
            else {
                resolve(new slideItem_1.SlideItem(photos, size));
            }
        });
    };
    SlideItems = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [loader_instance_1.WidgetLoaderInstance])
    ], SlideItems);
    return SlideItems;
})();
exports.SlideItems = SlideItems;
//# sourceMappingURL=slideShow.js.map