var SlideItem = (function () {
    function SlideItem(photos, size) {
        this.photos = photos;
        this.isRunning = false;
        if (this.photos.length > 1) {
            this.photos.push(this.photos[0]);
        }
        this.length = this.photos.length;
        this.image = this.photos.reverse().reduce(function (previous, current, index, arr) {
            return previous + 'url(' + current.url + ')' + ((index != arr.length - 1) ? ',' : '');
        }, "");
        return this;
    }
    return SlideItem;
})();
exports.SlideItem = SlideItem;
var Photo = (function () {
    function Photo() {
    }
    return Photo;
})();
exports.Photo = Photo;
//# sourceMappingURL=slideItem.js.map