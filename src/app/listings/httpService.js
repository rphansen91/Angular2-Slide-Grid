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
// import {Http} from 'angular2/http';
var angular2_1 = require("angular2/angular2");
var HttpHelper = (function () {
    function HttpHelper() {
        this.url = "https://api.antengo.com";
        this.http = new XMLHttpRequest();
        // @Inject(Http) public http: Http
    }
    HttpHelper.prototype.onResponse = function (callback) {
        this.successFunction = callback;
        return this;
    };
    HttpHelper.prototype.onError = function (callback) {
        this.errorFunction = callback;
        return this;
    };
    HttpHelper.prototype.request = function (endpoint, method, body) {
        this.endpoint = endpoint;
        this.body = JSON.stringify({ "id": "0", "method": method, "params": body });
        return this;
    };
    // send () {
    // 	// console.log(this.body)
    // 	return this.http.post(this.url + this.endpoint, this.body)
    // }
    HttpHelper.prototype.send = function () {
        this.http.open("post", this.url + this.endpoint, true);
        this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.http.send(this.body);
        var request = this;
        this.http.onreadystatechange = function () {
            if (request.http.readyState == request.http.DONE) {
                if (request.http.status == 200) {
                    var data = JSON.parse(request.http.response);
                    request.successFunction(data);
                }
                else {
                    var err = JSON.parse(request.http.response);
                    request.errorFunction(err);
                }
            }
        };
        return this;
    };
    HttpHelper = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HttpHelper);
    return HttpHelper;
})();
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=httpService.js.map