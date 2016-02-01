onmessage = function (e) {
    var slide = new SlideItem(e.data[0], e.data[1]);
    postMessage([slide, e.data[2]]);
};

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

var Photo = (function () {
    function Photo() {
    }
    return Photo;
})();