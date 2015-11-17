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
        this.delay = 17;
        this.change = 1;
    }
    SlowScroll.prototype.onInit = function () {
        if (this.scroll) {
            this.start();
        }
        else {
            this.stop();
        }
    };
    SlowScroll.prototype.start = function () {
        var scroller = this;
        scroller.intervalId = setInterval(function () {
            if (scroller.scroll) {
                scroller.element.nativeElement.scrollTop += scroller.change;
            }
        }, scroller.delay);
    };
    SlowScroll.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    __decorate([
        angular2_1.Input('scroll'), 
        __metadata('design:type', Boolean)
    ], SlowScroll.prototype, "scroll");
    SlowScroll = __decorate([
        angular2_1.Directive({
            selector: "slow-scroll",
            inputs: ["scroll: scroll"],
            providers: [angular2_1.ElementRef]
        }),
        __param(0, angular2_1.Inject(angular2_1.ElementRef)), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], SlowScroll);
    return SlowScroll;
})();
exports.SlowScroll = SlowScroll;
//# sourceMappingURL=slowScroll.js.map