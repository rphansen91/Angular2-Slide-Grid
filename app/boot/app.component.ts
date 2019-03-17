import { Component, ViewEncapsulation } from '@angular/core';

import { Customizations } from './customizations/customizations.service';
import { PartnersService } from './partners/partners.service';
import { WidgetLoaderInstance } from './loader/loader.instance';

@Component({
	selector: "widget",
	styles: [require("./app.less")],
	template: require("./app.html"),
	encapsulation: ViewEncapsulation.None
})
export class WidgetBootstrap {
	constructor (
		private _partners: PartnersService,
		public customizations: Customizations,
		public loader: WidgetLoaderInstance
	) {
		this.customizations.initialize();
		this._partners.initialize();
	}
}