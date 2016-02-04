import { Component, NgIf, Input } from "angular2/angular2";

import { FocusService } from "./focus.service";
import { MainFocus } from "./mainFocus.component";
 
@Component({
	selector: "focus-control",
	directives: [MainFocus],
	styleUrls: ["./app/focus/focus.css"],
	template: `
		<div class="blur" [class.blurActive]="focus.active" [style.height]="height">
			<main-focus></main-focus>
		</div>
	`
})
export class FocusControl {

	@Input('height')height: number;

	constructor(
		public focus: FocusService
	) { }

}