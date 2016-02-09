import { Component, Input, OnChanges } from "angular2/core";

import { Customizations } from '../../customizations/customizations.service';
import { PartnersService } from '../../partners/partners.service';
import { ShadowHover } from '../../display/shadow.directive';

@Component({
	selector: "opener",
	styles: [require("./opener.css")],
	directives: [ShadowHover],
	template: `
		<div class="openerContainer" 
			(mouseleave)="hide()">
		</div>

		<div class="main"
			[style.border-color]="color"
			[style.color]="color"
			(click)="openListing($event)"
			(mouseenter)="waitToShow($event)">
				+
		</div>

		<div class="sub" 
			[shadowHover]="[0,4,6]"
			[style.border-color]="color"
			[style.color]="color"
			[class.visible_one]="showSubOptions"
			(mouseenter)="show()"
			(click)="openChat($event)">
				<span class="icon-chat"></span>
		</div>

		<div class="sub"
			[shadowHover]="[0,4,6]"
			[style.border-color]="color"
			[style.color]="color"
			[class.visible_two]="showSubOptions"
			(mouseenter)="show()"
			(click)="openShare($event)">
				<span class="icon-share"></span>
		</div>
	`
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