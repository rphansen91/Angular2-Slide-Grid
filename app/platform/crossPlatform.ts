import {Injectable} from "angular2/core";
import {Devices, Device} from "./devices";
import {Browsers, Browser} from "./browsers";

@Injectable()
export class CrossPlatform {
	public userAgent: string;
	public device: Device;
	public browser: Browser;

	constructor () {
		this.userAgent = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
		this.setDeviceType()
		this.setBrowserType()
	}

	setDeviceType () {
		this.device = Devices.getInstance().getDevice(this.userAgent);
	}
	setBrowserType () {
		this.browser = Browsers.getInstance().getBrowser(this.userAgent);
	}
}