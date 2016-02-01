import { Component, NgIf, NgFor } from "angular2/angular2";

import { WidgetLoaderInstance } from "./loader.instance"

@Component({
	selector: "widget-loader",
	directives: [NgIf, NgFor],
	styleUrls: ["./app/loader/loader.css"],
	template: `
		<div class="widget-loader" *ng-if="_loader.loading">
			<div class="widget-loader-streaks">
				<div class="widget-loader-streak">
					<ul>
						<li *ng-for="#streak of streaks"
							[style.webkit-animation-delay]="streak + 's !important'"
							[style.-moz-animation-delay]="streak + 's !important'"
							[style.-o-animation-delay]="streak + 's !important'"
							[style.-ms-animation-delay]="streak + 's !important'"
							[style.animation-delay]="streak + 's !important'"
						></li>
					</ul>
				</div>
			</div>
		</div>
	`
})
export class WidgetLoader {

	public streaks: number[] = [1.25, 1.0, 0.75, 0.5, 0.25, 0.1];

	constructor (
		public _loader: WidgetLoaderInstance
	) {}
}