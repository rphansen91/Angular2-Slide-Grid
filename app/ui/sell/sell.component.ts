import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';

import { PartnersService } from '../../boot/partners/partners.service';
import { Customizations } from '../../boot/customizations/customizations.service';
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
	public hoveringId: any;

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
		this.hoveringId = setTimeout(() => {
			this.hovering = true;
		}, 400)
	}
	notHovering() {
		if (this.hoveringId) {
			clearTimeout(this.hoveringId)
		}
		this.hovering = false;
	}
}