var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import {Http} from 'angular2/http';
var worker_1 = require("angular2/web_worker/worker");
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
        worker_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HttpHelper);
    return HttpHelper;
})();
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=httpService.js.map