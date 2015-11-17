export class Devices {
	public all: Device[] = [];

	static instance: Devices;
	static creating: boolean = false;

	constructor() {
		if (Devices.creating) {
			this.all.push(new Device("iPhone", /iPhone/i, true))
			this.all.push(new Device("iPod", /iPod/i, true))
			this.all.push(new Device("iPad", /iPad/i, true))
			this.all.push(new Device("Android", /Android/i, false))
			this.all.push(new Device("IEMobile", /IEMobile/, false))
		} else {
			throw new Error("Can't use keyword new on Singleton Devices. Use Devices.getInstance()")
		}
	}

	static getInstance() {
		if (Devices.instance == null) {
			Devices.creating = true;
			Devices.instance = new Devices()
			Devices.creating = false;
		}
		return Devices.instance;
	}

	getDevice(userAgent: string): Device {
		var userDevice: Device = new Device("desktop", /desktop/i, false);
		this.all.forEach((device: Device) => {
			if (device.regEx.test(userAgent)) {
				device.setOperatingSystem(userAgent)
				userDevice = device
			}
		})
		return userDevice
	}
}
export class Device {
	public OS: OperatingSystem;

	constructor(public type: string, public regEx: RegExp, public isApple: boolean) { }

	setOperatingSystem (userAgent: string) {
		this.OS = new OperatingSystem(this.type, userAgent)
	}

	getViewType ():string {
		var viewType = "desktop"
		if (this.isApple) {
			viewType = "mobileHigh"
		} else if (this.type == "Android" || this.type == "IEMobile") {
			viewType = "mobileMedium"
		}
		return viewType;
	}
}

class OperatingSystem {
	public values: string[];
	public mainVersion: number;
	public minorVersion: number;
	public subVersion: number;

	constructor(type: string, userAgent: string) {
		var begin = userAgent.indexOf(type) + type.length + 1;
		var valid = ['_', '-', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var invalid = false;
		this.values = userAgent.split('').filter((char: string, i: number) => {
			if (i >= begin && !invalid) {
				if (valid.indexOf(char]) == -1) {
					invalid = true;
				} else if (char != "_" && char != "-" && char != ".") {
					return true;
				}
			}
			return false
		})
	}
}