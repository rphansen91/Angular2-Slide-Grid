import { Component, Input } from "angular2/core";

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
		public focus: FocusService
	) { }

	closeFocus() {
		this.focus.hide();
	}

}