import {Devices, Device} from "./devices"
import {Browsers, Browser} from "./browsers"

export class CrossPlatform {
	public userAgent: string;
	public device: Device;
	public browser: Browser;

	static instance: CrossPlatform;
	static isCreating: boolean = false;

	constructor () {
		if (CrossPlatform.isCreating) {
			this.userAgent = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
			this.setDeviceType()
			this.setBrowserType()
		} else {
			throw new Error("Can't use keyword new on Singleton CrossPlatform. Use CrossPlatform.getInstance()")
		}
	}

	static getInstance () {
		if (CrossPlatform.instance == null) {
			CrossPlatform.isCreating = true;
			CrossPlatform.instance = new CrossPlatform();
			CrossPlatform.isCreating = false;
		}

		return CrossPlatform.instance;
	}

	setDeviceType () {
		this.device = Devices.getInstance().getDevice(this.userAgent);
	}
	setBrowserType () {
		this.browser = Browsers.getInstance().getBrowser(this.userAgent);
	}
}