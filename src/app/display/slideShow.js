var easings_1 = require('./easings');
var SlideItems = (function () {
    function SlideItems() {
        this.slides = [];
        this.isRunning = false;
        if (!SlideItems.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call SlideItems.getInstance() instead.");
        }
        this.slideInterval = new ImageInterval();
    }
    SlideItems.getInstance = function () {
        if (SlideItems.instance == null) {
            SlideItems.isCreating = true;
            SlideItems.instance = new SlideItems();
            SlideItems.isCreating = false;
        }
        return SlideItems.instance;
    };
    SlideItems.prototype.add = function (photos, size) {
        var slide = new SlideItem(photos, size);
        if (photos.length > 1) {
            this.slides.push(slide);
        }
        return slide;
    };
    SlideItems.prototype.startShow = function () {
        var backwards = 0;
        var show = this;
        if (!show.isRunning) {
            show.slideInterval.config(1000, "easeIn", 10);
            show.slideInterval.resetValue();
            show.isRunning = true;
            show.slideInterval.startInterval(function () {
                if (show.slideInterval.value == 100) {
                    backwards++;
                    show.slideInterval.resetValue();
                }
                var finishedAll = true;
                show.slideInterval.increaseValue();
                show.slides.forEach(function (slide) {
                    var index = slide.getIndex(backwards);
                    if (index >= 0) {
                        slide.positon.setPosition(show.slideInterval.value, index);
                        finishedAll = false;
                    }
                });
                if (finishedAll) {
                    show.stopShow();
                }
            });
        }
    };
    SlideItems.prototype.stopShow = function () {
        this.slideInterval.stopInterval();
        this.isRunning = false;
    };
    SlideItems.isCreating = false;
    return SlideItems;
})();
exports.SlideItems = SlideItems;
var SlideItem = (function () {
    function SlideItem(photos, size) {
        this.photos = photos;
        if (this.photos.length > 1) {
            this.photos.push(this.photos[0]);
        }
        this.length = this.photos.length;
        this.positon = new ImagePosition().setSize(size).setPosition(100, this.length - 1);
        this.image = this.photos.reverse().reduce(function (previous, current, index, arr) {
            return previous + 'url(' + current.url + ')' + ((index != arr.length - 1) ? ',' : '');
        }, "");
        return this;
    }
    SlideItem.prototype.start = function () {
        if (this.length > 1) {
            var show = this;
            var index = this.length - 2;
            show.interval = new ImageInterval();
            show.interval.config(500, "easeIn");
            show.interval.resetValue();
            show.interval.startInterval(function () {
                var finished = false;
                show.interval.increaseValue();
                show.positon.setPosition(show.interval.value, index);
                if (show.interval.value == 100) {
                    index--;
                    if (index < 0) {
                        finished = true;
                    }
                    else {
                        show.interval.resetValue();
                    }
                }
                if (finished) {
                    show.interval.stopInterval();
                }
            });
        }
    };
    SlideItem.prototype.stop = function () {
        if (this.interval) {
            this.interval.stopInterval();
        }
    };
    SlideItem.prototype.positioning = function () {
        if (this.positon && this.positon.position) {
            return this.positon.position;
        }
        else {
            return "0";
        }
    };
    SlideItem.prototype.getIndex = function (backward) {
        return this.length - backward - 2;
    };
    return SlideItem;
})();
exports.SlideItem = SlideItem;
var Photo = (function () {
    function Photo() {
    }
    return Photo;
})();
exports.Photo = Photo;
var ImageInterval = (function () {
    function ImageInterval() {
        this.value = 0;
        this.currentTime = 0;
        this.startValue = 0;
        this.endValue = 100;
        this.change = 100;
        this.ammount = 100;
    }
    ImageInterval.prototype.config = function (d, t, ammount, start, end) {
        this.duration = d;
        this.type = t;
        this.startValue = (start) ? start : 0;
        this.endValue = (end) ? end : 100;
        this.change = this.endValue - this.startValue;
        this.ammount = (ammount) ? ammount : this.ammount;
        this.interval = this.duration / this.ammount;
        this.easingFn = new easings_1.Easings(this.type);
    };
    ImageInterval.prototype.resetValue = function () {
        this.value = 0;
        this.currentTime = 0;
    };
    ImageInterval.prototype.increaseValue = function () {
        // Fibonacci increase
        this.currentTime += this.interval;
        this.value = this.easingFn(this.currentTime, this.startValue, this.change, this.duration);
    };
    ImageInterval.prototype.startInterval = function (callback) {
        this.id = setInterval(function () {
            callback();
        }, this.interval);
    };
    ImageInterval.prototype.stopInterval = function () {
        clearInterval(this.id);
    };
    return ImageInterval;
})();
exports.ImageInterval = ImageInterval;
var ImagePosition = (function () {
    function ImagePosition() {
        this.position = "0";
        return this;
    }
    ImagePosition.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    ImagePosition.prototype.setPosition = function (percentage, index) {
        var tmp = "";
        var begin = index;
        for (var i = 0; i < begin; i++) {
            tmp += "-" + this.size + "px, ";
        }
        tmp += ((((percentage / 100) * this.size)) - this.size) + "px, 0";
        this.position = tmp;
        return this;
    };
    return ImagePosition;
})();
exports.ImagePosition = ImagePosition;
//# sourceMappingURL=slideShow.js.map