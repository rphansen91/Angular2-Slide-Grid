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
var PriceDisplay = (function () {
    function PriceDisplay() {
        this.numbersOnly = /\d+/g;
        this.shortener = new NumberShortener();
    }
    PriceDisplay.prototype.transform = function (value, args) {
        var priceStr = "";
        var numbers = value.match(this.numbersOnly);
        if (numbers && numbers.length) {
            var number = Number(numbers[0]);
            priceStr = this.shortener.setNumber(number).shorten();
        }
        return priceStr;
    };
    PriceDisplay = __decorate([
        angular2_1.Pipe({
            name: "price"
        }), 
        __metadata('design:paramtypes', [])
    ], PriceDisplay);
    return PriceDisplay;
})();
exports.PriceDisplay = PriceDisplay;
var NumberShortener = (function () {
    function NumberShortener() {
        this.formatted = "";
    }
    NumberShortener.prototype.setNumber = function (number) {
        this.number = number;
        this.place = ThousandsValues.getInstance().getPlace(this.number);
        return this;
    };
    NumberShortener.prototype.shorten = function () {
        if (this.place) {
            this.formatted = (this.number / this.place.value).toFixed(1).replace(".0", "") + " " + this.place.unit;
        }
        else {
            this.formatted = this.number + "";
        }
        return this.formatted;
    };
    return NumberShortener;
})();
var ThousandsValues = (function () {
    function ThousandsValues() {
        this.places = [];
        this.places.push(new ThousandsPlace("B", 1000000000));
        this.places.push(new ThousandsPlace("M", 1000000));
        this.places.push(new ThousandsPlace("K", 1000));
    }
    ThousandsValues.getInstance = function () {
        if (ThousandsValues.instance == null) {
            ThousandsValues.isCreating = true;
            ThousandsValues.instance = new ThousandsValues();
            ThousandsValues.isCreating = false;
        }
        return ThousandsValues.instance;
    };
    ThousandsValues.prototype.getPlace = function (num) {
        var place = this.places.filter(function (place, i, arr) {
            return place.isInstance(num);
        });
        return (place && place.length) ? place[0] : null;
    };
    ThousandsValues.isCreating = false;
    return ThousandsValues;
})();
var ThousandsPlace = (function () {
    function ThousandsPlace(unit, value) {
        this.unit = unit;
        this.value = value;
    }
    ThousandsPlace.prototype.isInstance = function (value) {
        return (value / this.value >= 1);
    };
    return ThousandsPlace;
})();
//# sourceMappingURL=price.js.map