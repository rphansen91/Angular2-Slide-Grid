import { Component, Input, OnChanges } from "angular2/core";

import { Customizations } from '../../customizations/customizations.service';
import { PartnersService } from '../../partners/partners.service';
import { ShadowHover } from '../../display/shadow.directive';

@Component({
	selector: "opener",
	directives: [ShadowHover],
	styles: [require("./opener.less")],
	template: require("./opener.html")
})
export class Opener implements OnChanges {

	@Input('id') listingId: string;
	
	public showSubOptions: boolean = false;
	public url: string;
	public color: string;

	constructor (
		private _customizations: Customizations,
		private _partnersService: PartnersService
	) {
		this.url = "https://antengo.com/p?" + this._partnersService.partner + "/#/itemDetail/";
		this.color = this._customizations.values.colors[0];
	}

	ngOnChanges () {
		this.hide()
	}

	openListing($event: any) {
		$event.stopPropagation()

		if (this.showSubOptions) {
			window.open(this.url + this.listingId);
		} else {
			this.showSubOptions = true;
		}
	}

	openShare($event: any) {
		$event.stopPropagation()
		window.open(this.url + this.listingId + "?open=share");
	}

	openChat($event: any) {
		$event.stopPropagation()
		window.open(this.url + this.listingId + "?open=chat");
	}
	waitToShow () {
		setTimeout(() => {
			this.show();
		}, 400)
	}
	show() {
		this.showSubOptions = true;
	}
	hide() {
		this.showSubOptions = false;
	}
	toggle() {
		if (this.showSubOptions) {
			this.hide()
		} else {
			this.show()
		}
	}

}