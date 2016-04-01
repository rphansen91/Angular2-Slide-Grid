import { Component } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { CTAService } from './cta.service';
import { Customizations } from '../customizations/customizations.service';

@Component({
	selector: "call-to-action",
	styles: [require("./cta.less")],
	template: require("./cta.html"),
	directives: [NgIf]
})
export class CTA {
	public protection: string = `url(${require("./protection.png")})`;
	public shield: string = `url(${require("./shield.png")})`;

	constructor(
		public cta: CTAService,
		public customizations: Customizations
	) {}
}