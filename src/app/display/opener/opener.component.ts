import { Component, Input, NgIf } from "angular2/angular2";

import { Customizations } from '../../customizations/customizations.service';
import { PartnersService } from '../../partners/partners.service';

@Component({
	selector: "opener",
	styleUrls: ["./app/display/opener/opener.css"],
	directives: [NgIf],
	template: `
		<div class="openerContainer"
			*ng-if="showMain"
			[style.color]="customizations.values.colors[0]"
			(mouseenter)="show()"
			(mouseleave)="hide()">
			
			<div class="main"
				[style.border-color]="customizations.values.colors[0]">
				<span class="icon-mustache"></span>
			</div>
			<div class="sub" 
				[style.border-color]="customizations.values.colors[0]"
				[class.visible_one]="showSubs"
				(click)="openChat()">
				<span class="icon-chat"></span>
			</div>
			<div class="sub" 
				[style.border-color]="customizations.values.colors[0]"
				[class.visible_two]="showSubs"
				(click)="openShare()">
				<span class="icon-share"></span>
			</div>
			
		</div>
	`
})
export class Opener {

	@Input('show') showMain: boolean = false;
	@Input('id') listingId: string;
	public showSubs: boolean = false;

	constructor (
		public customizations: Customizations,
		private _partnersService: PartnersService
	) {}

	openShare () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listingId + "?open=share");
	}

	openChat () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listingId + "?open=chat");
	}

	show() {
		this.showSubs = true;
	}
	hide() {
		this.showSubs = false;
	}

}