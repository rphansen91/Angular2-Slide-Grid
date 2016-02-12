import { Component, Input, ElementRef } from "angular2/core";
import { Observable } from 'rxjs/Rx';

import { FocusService } from "../focus.service";
import { MainFocus } from "../main/main.component";
 
@Component({
	selector: "focus-control",
	directives: [MainFocus],
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