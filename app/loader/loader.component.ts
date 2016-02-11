import { Component, OnInit } from "angular2/core";
import { NgIf, NgFor } from "angular2/common";

import { Customizations } from '../customizations/customizations.service';
import { WidgetLoaderInstance } from "./loader.instance";

@Component({
	selector: "widget-loader",
	directives: [NgIf, NgFor],
	styles: [require("./loader.less")],
	template: require("./loader.html")
})
export class WidgetLoader implements OnInit {

	public colors: string[];

	constructor (
		public loader: WidgetLoaderInstance,
		private _customizations: Customizations
	) {}

	ngOnInit () {
		this.colors = this._customizations.values.colors;
	}

}