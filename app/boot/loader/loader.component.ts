import { Component, Input, OnInit } from "@angular/core";

import { Customizations } from '../customizations/customizations.service';

@Component({
	selector: "widget-loader",
	styles: [require("./loader.less")],
	template: require("./loader.html")
})
export class WidgetLoader implements OnInit {

	@Input('loading') loading: boolean = false;

	public colors: string[];

	constructor (
		private _customizations: Customizations
	) {}

	ngOnInit () {
		this.colors = this._customizations.values.colors;
	}

}