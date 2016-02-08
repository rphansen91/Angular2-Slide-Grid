import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';

import { PartnersService } from '../partners/partners.service';
import { Customizations } from '../customizations/customizations.service';

@Component({
	selector: "sell-button",
	directives: [NgIf],
	styleUrls: ["./app/sell/sell.css"],
	template: `
		<div class="sell"
			[class.show]="show"
			[class.oblong]="hovering" 
			[style.color]="customizations.values.colors[0]"
			[style.box-shadow]="'0 8px 12px 0' + customizations.values.colors[0]"
			(click)="sell()" 
			(mouseenter)="isHovering()" 
			(mouseleave)="notHovering()">
				<div class="dollarContainer">
					<span>$</span><span *ngIf="hovering" class="sellText">ell</span>
				</div>
				<div class="featuredText" [class.featuredTextVisible]="hovering">
					and get\n<span class="bold">featured</span>\nhere <img class="partnerLogo" [src]="customizations.values.partnerLogo"/>
				</div>
		</div>
	`,
})
export class SellButton {

	@Input('show') show: boolean;

	public hovering: boolean = false;

	constructor(
		public customizations: Customizations,
		private _partnersService: PartnersService
	) {}

	sell() {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/post");
	}

	isHovering() {
		this.hovering = true;
	}
	notHovering() {
		this.hovering = false;
	}
}