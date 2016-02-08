import { Component } from "angular2/core";
import { NgIf, NgFor } from "angular2/common";

import { Customizations } from '../customizations/customizations.service';
import { WidgetLoaderInstance } from "./loader.instance";

@Component({
	selector: "widget-loader",
	directives: [NgIf, NgFor],
	styleUrls: ["./app/loader/loader.css"],
	template: `
		<div class="widget-loader" *ngIf="_loader.loading">
			<div class="widget-loader-bar" *ngFor="#color of colors; #i = index;"
				[style.background-color]="color"
				[style.webkit-animation]="'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'"
				[style.-moz-animation]="'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'"
				[style.-o-animation]="'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'"
				[style.-ms-animation]="'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'"
				[style.animation]="'loading ' + colors.length + 's linear ' + (colors.length - i - 1) + 's infinite'"
			></div>
		</div>
	`
})
export class WidgetLoader {

	public colors: string[];

	constructor (
		public _loader: WidgetLoaderInstance,
		public _customizations: Customizations
	) {
		this.colors = this._customizations.values.colors;
	}
}