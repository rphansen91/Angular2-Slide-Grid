var Easings = (function () {
    function Easings(type) {
        this.type = type;
        this.types = ["easeOut", "easeIn"];
        if (this.types.indexOf(type) == -1) {
            this.type = this.type[0];
        }
        return this[this.type];
    }
    Easings.prototype.easeIn = function (t, s, c, d) {
        t /= d;
        return c * t * t + s;
    };
    Easings.prototype.easeOut = function (t, s, c, d) {
        t /= d;
        return -c * t * (t - 2) + s;
    };
    return Easings;
})();
exports.Easings = Easings;
//# sourceMappingURL=easings.js.map