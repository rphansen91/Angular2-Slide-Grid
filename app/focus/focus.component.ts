import { Component, Input } from "angular2/core";

import { FocusService } from "./focus.service";
import { MainFocus } from "./mainFocus.component";
 
@Component({
	selector: "focus-control",
	directives: [MainFocus],
	styles: [require("./focus.css")],
	template: `
		<div class="blur" 
			[class.blurActive]="focus.active" 
			[style.height]="height"
			(click)="closeFocus()">
			<main-focus></main-focus>
		</div>
	`
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