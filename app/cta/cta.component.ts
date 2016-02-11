import { Component } from 'angular2/core';

import { CTAService } from './cta.service';

@Component({
	selector: "call-to-action",
	styles: [require("./cta.less")],
	template: require("./cta.html")
})
export class CTA {
	public image: string = `url(${require("./cta.png")})`;

	constructor(
		public cta: CTAService
	) {}
}