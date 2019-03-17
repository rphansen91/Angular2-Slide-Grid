import { Component, Input, ElementRef } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

import { FocusService } from "../focus.service";
 
@Component({
	selector: "focus-control",
	styles: [require("./focus.less")],
	template: require("./focus.html")
})
export class FocusControl {

	@Input('height')height: number;

	constructor(
		public element: ElementRef,
		public focus: FocusService
	) {
		Observable.fromEvent(this.element.nativeElement, "mouseover", (evt) => {
			return evt.target.closest("main-focus")
		})
		.filter(x => x == null)
		.subscribe(() => {
			this.focus.hide();
		})
	}

	closeFocus() {
		this.focus.hide();
	}

}