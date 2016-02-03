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
var angular2_1 = require("angular2/angular2");
var SlowScroll = (function () {
    function SlowScroll(element) {
        this.element = element;
        this.interval = SlowScrollInterval.getInstance();
    }
    SlowScroll.prototype.onInit = function () {
        this.interval.addScroller(this);
    };
    __decorate([
        angular2_1.Input('direction'), 
        __metadata('design:type', Number)
    ], SlowScroll.prototype, "direction");
    SlowScroll = __decorate([
        angular2_1.Directive({
            selector: "slow-scroll",
            inputs: ["direction: direction"],
            providers: [angular2_1.ElementRef]
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], SlowScroll);
    return SlowScroll;
})();
exports.SlowScroll = SlowScroll;
var SlowScrollInterval = (function () {
    function SlowScrollInterval() {
        this.delay = 40;
        this.change = 1;
        this.isRunning = false;
        this.scrollers = [];
        if (!SlowScrollInterval.isCreating) {
            throw new Error("Can't invoke SlowScrollInterval using keyword new. Use SlowScrollInterval.getInstance() instead.");
        }
    }
    SlowScrollInterval.getInstance = function () {
        if (SlowScrollInterval.instance == null) {
            SlowScrollInterval.isCreating = true;
            SlowScrollInterval.instance = new SlowScrollInterval();
            SlowScrollInterval.isCreating = false;
        }
        return SlowScrollInterval.instance;
    };
    SlowScrollInterval.prototype.addScroller = function (scroller) {
        this.scrollers.push(scroller);
    };
    SlowScrollInterval.prototype.setScroll = function (scroller, index, arr) {
        if (SlowScrollInterval.firstInterval && scroller.direction) {
            scroller.element.nativeElement.scrollTop = scroller.element.nativeElement.clientHeight;
        }
        if (scroller.direction) {
            scroller.element.nativeElement.scrollTop -= SlowScrollInterval.instance.change;
        }
        else {
            scroller.element.nativeElement.scrollTop += SlowScrollInterval.instance.change;
        }
    };
    SlowScrollInterval.prototype.start = function () {
        if (!this.isRunning) {
            SlowScrollInterval.firstInterval = true;
            this.isRunning = true;
            this.id = setInterval(function () {
                SlowScrollInterval.instance.scrollers.forEach(SlowScrollInterval.instance.setScroll);
                SlowScrollInterval.firstInterval = false;
            }, this.delay);
        }
    };
    SlowScrollInterval.prototype.stop = function () {
        this.isRunning = false;
        clearInterval(this.id);
    };
    SlowScrollInterval.isCreating = false;
    SlowScrollInterval.firstInterval = false;
    return SlowScrollInterval;
})();
exports.SlowScrollInterval = SlowScrollInterval;
//# sourceMappingURL=slowScroll.js.map