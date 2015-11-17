var Devices = (function () {
    function Devices() {
        this.all = [];
        if (Devices.creating) {
            this.all.push(new Device("iPhone", /iPhone/i, true));
            this.all.push(new Device("iPod", /iPod/i, true));
            this.all.push(new Device("iPad", /iPad/i, true));
            this.all.push(new Device("Android", /Android/i, false));
            this.all.push(new Device("IEMobile", /IEMobile/, false));
        }
        else {
            throw new Error("Can't use keyword new on Singleton Devices. Use Devices.getInstance()");
        }
    }
    Devices.getInstance = function () {
        if (Devices.instance == null) {
            Devices.creating = true;
            Devices.instance = new Devices();
            Devices.creating = false;
        }
        return Devices.instance;
    };
    Devices.prototype.getDevice = function (userAgent) {
        var userDevice = new Device("desktop", /desktop/i, false);
        this.all.forEach(function (device) {
            if (device.regEx.test(userAgent)) {
                device.setOperatingSystem(userAgent);
                userDevice = device;
            }
        });
        return userDevice;
    };
    Devices.creating = false;
    return Devices;
})();
exports.Devices = Devices;
var Device = (function () {
    function Device(type, regEx, isApple) {
        this.type = type;
        this.regEx = regEx;
        this.isApple = isApple;
    }
    Device.prototype.setOperatingSystem = function (userAgent) {
        this.OS = new OperatingSystem(this.type, userAgent);
    };
    Device.prototype.getViewType = function () {
        var viewType = "desktop";
        if (this.isApple) {
            viewType = "mobileHigh";
        }
        else if (this.type == "Android" || this.type == "IEMobile") {
            viewType = "mobileMedium";
        }
        return viewType;
    };
    return Device;
})();
exports.Device = Device;
var OperatingSystem = (function () {
    function OperatingSystem(type, userAgent) {
        var begin = userAgent.indexOf(type) + type.length + 1;
        var valid = ['_', '-', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var invalid = false;
        this.values = userAgent.split('').filter(function (char, i) {
            if (i >= begin && !invalid) {
                if (valid.indexOf(char) == -1) {
                    invalid = true;
                }
                else if (char != "_" && char != "-" && char != ".") {
                    return true;
                }
            }
            return false;
        });
    }
    return OperatingSystem;
})();
//# sourceMappingURL=devices.js.map