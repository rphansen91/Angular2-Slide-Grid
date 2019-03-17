import { Component } from '@angular/core';

import { CTAService } from './cta.service';
import { Customizations } from '../customizations/customizations.service';

@Component({
	selector: "call-to-action",
	styles: [require("./cta.less")],
	template: require("./cta.html")
})
export class CTA {
	public protection: string = `url(${require("./protection.png")})`;
	public shield: string = `url(${require("./shield.png")})`;

	constructor(
		public cta: CTAService,
		public customizations: Customizations
	) {}
}