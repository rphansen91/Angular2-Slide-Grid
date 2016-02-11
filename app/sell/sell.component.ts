import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';

import { PartnersService } from '../partners/partners.service';
import { Customizations } from '../customizations/customizations.service';
import { ShadowHover } from '../display/shadow.directive';

@Component({
	selector: "sell-button",
	directives: [NgIf, ShadowHover],
	styles: [require("./sell.less")],
	template: require("./sell.html")
})
export class SellButton {

	@Input('show') show: boolean;

	public hovering: boolean = false;

	constructor(
		public customizations: Customizations,
		private _partnersService: PartnersService
	) {}

	sell() {
		if (this.hovering) {
			let code = this._partnersService.partner;
			window.open("https://antengo.com/p?" + code + "/#/post");
		} else {
			this.hovering = true;
		}
	}

	isHovering() {
		setTimeout(() => {
			this.hovering = true;
		}, 0)
	}
	notHovering() {
		this.hovering = false;
	}
}