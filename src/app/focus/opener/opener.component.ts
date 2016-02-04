import { Component, Input, NgIf, OnChanges } from "angular2/angular2";

import { Customizations } from '../../customizations/customizations.service';
import { PartnersService } from '../../partners/partners.service';
import { CrossPlatform } from '../../platform/crossPlatform';

@Component({
	selector: "opener",
	styleUrls: ["./app/focus/opener/opener.css"],
	directives: [NgIf],
	template: `
		<div class="openerContainer"
			[style.color]="customizations.values.colors[0]"
			(mouseenter)="show()"
			(mouseleave)="hide()">
			
			<div class="main"
				[style.border-color]="customizations.values.colors[0]"
				(click)="openListing($event)">
				+
			</div>
			<div class="sub" 
				[style.border-color]="customizations.values.colors[0]"
				[class.visible_one]="showSubs"
				(click)="openChat($event)">
				<span class="icon-chat"></span>
			</div>
			<div class="sub" 
				[style.border-color]="customizations.values.colors[0]"
				[class.visible_two]="showSubs"
				(click)="openShare($event)">
				<span class="icon-share"></span>
			</div>
			
		</div>
	`
})
export class Opener implements OnChanges {

	@Input('id') listingId: string;
	public showSubs: boolean = false;
	public opened: boolean = false;
	public url: string;

	constructor (
		public customizations: Customizations,
		private _partnersService: PartnersService,
		private _crossPlatform: CrossPlatform
	) {
		this.url = "https://antengo.com/p?" + this._partnersService.partner + "/#/itemDetail/"
	}

	onChanges () {
		this.opened = false;
	}

	openListing($event: any) {
		$event.stopPropagation()

		if (this._crossPlatform.device.type == "Desktop" || this.opened) {
			window.open(this.url + this.listingId);
		} else {
			this.showSubs = true;
			this.opened = true;
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

	show() {
		this.showSubs = true;
	}
	hide() {
		this.showSubs = false;
	}

}