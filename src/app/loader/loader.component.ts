import { Component, NgIf, NgFor } from "angular2/angular2";

import { WidgetLoaderInstance } from "./loader.instance"

@Component({
	selector: "widget-loader",
	directives: [NgIf, NgFor],
	styleUrls: ["./app/loader/loader.css"],
	template: `
		<div class="widget-loader" *ng-if="_loader.loading">
			<div class="widget-loader-bar" *ng-for="#color of colors; #i = index;"
				[style.background-color]="color"
				[style.webkit-animation]="'loading ' + colors.length + 's linear ' + i + 's infinite'"
				[style.-moz-animation]="'loading ' + colors.length + 's linear ' + i + 's infinite'"
				[style.-o-animation]="'loading ' + colors.length + 's linear ' + i + 's infinite'"
				[style.-ms-animation]="'loading ' + colors.length + 's linear ' + i + 's infinite'"
				[style.animation]="'loading ' + colors.length + 's linear ' + i + 's infinite'"
			></div>
		</div>
	`
})
export class WidgetLoader {

	public streaks: number[] = [1.25, 1.0, 0.75, 0.5, 0.25, 0.1];
	public colors: string[] = [
		"#8c77b6",
		"#baadd3",
		"#f3f1f7"
	];

	constructor (
		public _loader: WidgetLoaderInstance
	) {}
}