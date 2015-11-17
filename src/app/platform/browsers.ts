export class Browsers {
	public all: Browser[] = [];

	static instance: Browsers;
	static isCreating: boolean = false;

	constructor () {
		if (Browsers.isCreating) {
			this.all.push(new Browser("chrome", /chrome/i));
			this.all.push(new Browser("safari", /safari/i));
			this.all.push(new Browser("firefox", /firefox/i));
			this.all.push(new Browser("ie", /internet explorer/i));
		} else {
			throw new Error("Can't use keyword new on Singleton Browsers. Use Browsers.getInstance()")
		}
	}

	static getInstance () {
		if (Browsers.instance == null) {
			Browsers.isCreating = true;
			Browsers.instance = new Browsers();
			Browsers.isCreating = false;
		}

		return Browsers.instance;
	}

	getBrowser(userAgent: string) {
		var userBrowser: Browser;
		this.all.forEach((browser: Browser) => {
			if (browser.regEx.test(userAgent)) {
				userBrowser = browser;
			}
		})
		return userBrowser;
	}
}

export class Browser {
	constructor (public type: string, public regEx: RegExp) {}
}