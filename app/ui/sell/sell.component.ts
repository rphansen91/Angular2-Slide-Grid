import { Component, Input, ElementRef } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Observable } from 'rxjs/Rx';

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
		public element: ElementRef,
		public customizations: Customizations,
		private _partnersService: PartnersService
	) {
		let isHovering = (evt): boolean => {
			return (evt.type == "mouseenter")
		}
		let create = (eventType):Observable<boolean> => {
			return Observable.fromEvent(element.nativeElement, eventType, isHovering);
		}

		create("mouseenter").merge(create("mouseleave"))
		.debounceTime(400)
		.subscribe((hovering: boolean) => {
			this.hovering = hovering;
		})
	}

	sell() {
		if (this.hovering) {
			let code = this._partnersService.partner;
			window.open("https://antengo.com/p?" + code + "/#/post");
		} else {
			this.hovering = true;
		}
	}
}