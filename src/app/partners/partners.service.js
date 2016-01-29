var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var http_1 = require("angular2/http");
var PartnersService = (function () {
    function PartnersService(_http) {
        this._http = _http;
        this.partners = [];
        this.partner = "antengo";
        this.isValid = false;
    }
    PartnersService.prototype.initialize = function () {
        var _this = this;
        this.setPartner();
        if (this.partner && this.partner.length) {
            this.getPartners()
                .map(function (res) { return res.json().result.rs; })
                .subscribe(function (partners) {
                _this.partners = partners;
                _this.validatePartner();
            });
        }
    };
    PartnersService.prototype.setPartner = function () {
        var url = window.location.href;
        if (url && url.indexOf("partner=") != -1) {
            this.partner = url.split("partner=")[1].split("&")[0];
        }
    };
    PartnersService.prototype.removePartner = function () {
        this.partner = "antengo";
    };
    PartnersService.prototype.validatePartner = function () {
        var _this = this;
        if (this.partners && this.partners.length) {
            var filtered = this.partners.filter(function (p) { return _this.verifyCode(p); });
            if (filtered && filtered.length) {
                this.isValid = true;
            }
            else {
                this.removePartner();
            }
        }
        else {
            this.removePartner();
        }
    };
    PartnersService.prototype.verifyCode = function (partner) {
        return partner.code == this.partner;
    };
    PartnersService.prototype.getPartners = function () {
        var url = "https://api.antengo.com/partner/rpc";
        var body = JSON.stringify({ id: 0, method: "getActive", params: {} });
        return this._http.post(url, body);
    };
    PartnersService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PartnersService);
    return PartnersService;
})();
exports.PartnersService = PartnersService;
//# sourceMappingURL=partners.service.js.map