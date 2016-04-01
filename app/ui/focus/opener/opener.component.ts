import { Component, Input, OnChanges } from "angular2/core";

import { Customizations } from '../../../boot/customizations/customizations.service';
import { PartnersService } from '../../../boot/partners/partners.service';
import { ShadowHover } from '../../display/shadow.directive';

@Component({
	selector: "opener",
	directives: [ShadowHover],
	styles: [require("./opener.less")],
	template: require("./opener.html")
})
export class Opener implements OnChanges {

	@Input('listing') public listing: any;
	
	public showSubOptions: boolean = false;
	public profile: string;
	public url: string;
	public color: string;

	public badges = {
		"0": "",
		"1": require("../../../assets/badges/new_badge_start.png"),
		"2": require("../../../assets/badges/new_badge_half.png"),
		"3": require("../../../assets/badges/badge_complete.png"),
	}

	constructor (
		private _customizations: Customizations,
		private _partnersService: PartnersService
	) {
		this.profile = "https://antengo.com/p?" + this._partnersService.partner + "/#/profile/";
		this.url = "https://antengo.com/p?" + this._partnersService.partner + "/#/itemDetail/";
		this.color = this._customizations.values.colors[0];
	}

	ngOnChanges () {
		this.hide()
	}

	openListing($event: any) {
		$event.stopPropagation()

		if (this.showSubOptions) {
			window.open(this.url + this.listing.id);
		} else {
			this.showSubOptions = true;
		}
	}

	openProfile ($event: any) {
		$event.stopPropagation()
		window.open(this.profile + this.listing.user.id);
	}

	openShare($event: any) {
		$event.stopPropagation()
		window.open(this.url + this.listing.id + "?open=share");
	}

	openChat($event: any) {
		$event.stopPropagation()
		window.open(this.url + this.listing.id + "?open=chat");
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