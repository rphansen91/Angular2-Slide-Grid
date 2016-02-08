
onmessage = function (e) {
    var listings = e.data[0];
    var grid = e.data[1];

    listings = listings.map(function (listing, index) {
        
        if (listing.photos.length > 1) {
            listing.photos = listing.photos.concat(listing.photos[0]);
        }

        listing.slide = new SlideItem(listing.photos);
        listing.position = new ImagePosition().setSize(grid.width * 1.3).setPosition(100, listing.photos.length - 1).position;
        listing.top = (Math.floor(index / grid.columns) * grid.height);
        listing.left = ((index % grid.columns) * grid.width);
        return listing;
    });

    postMessage([listings]);
};

var SlideItem = (function () {
    function SlideItem(photos) {
        this.photos = photos;
        this.isRunning = false;
        
        this.length = this.photos.length;
        this.image = this.photos.reverse().reduce(function (previous, current, index, arr) {
            return previous + 'url(' + current.url + ')' + ((index != arr.length - 1) ? ',' : '');
        }, "");
        return this;
    }
    return SlideItem;
})();

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