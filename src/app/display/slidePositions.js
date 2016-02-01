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
var SlidePositions = (function () {
    function SlidePositions() {
    }
    SlidePositions.prototype.initialize = function () {
        this._worker = (window["Worker"]) ? new window["Worker"]("./app/workers/positionWorker.js") : false;
        this._workerResolvers = [];
    };
    SlidePositions.prototype.getPosition = function (percentage, index, size) {
        var work = this;
        return new Promise(function (resolve, reject) {
            if (work._worker) {
                work._workerResolvers.push(resolve);
                work._worker.postMessage([percentage, index, size, work._workerResolvers.length - 1]);
                work._worker.onmessage = function (e) {
                    var resolver = work._workerResolvers[e.data[1]];
                    resolver(e.data[0]);
                };
            }
            else {
                var pos = new ImagePosition().setSize(size).setPosition(percentage, index);
                resolve(pos.position);
            }
        });
    };
    SlidePositions = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SlidePositions);
    return SlidePositions;
})();
exports.SlidePositions = SlidePositions;
var ImagePosition = (function () {
    function ImagePosition() {
        this.position = "0";
    }
    ImagePosition.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    ImagePosition.prototype.setPosition = function (percentage, index) {
        var tmp = "";
        var begin = index;
        for (var i = 0; i < begin; i++) {
            tmp += "-" + this.size + "px 50%, ";
        }
        tmp += ((((percentage / 100) * this.size)) - this.size) + "px 50%, 0 50%";
        this.position = tmp;
        return this;
    };
    return ImagePosition;
})();
//# sourceMappingURL=slidePositions.js.map