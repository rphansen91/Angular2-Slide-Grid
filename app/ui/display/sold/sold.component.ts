import { Component } from "angular2/core";

import { Customizations } from "../../../boot/customizations/customizations.service";

@Component({
	selector: "sold-banner",
	styles: [require("./sold.less")],
	template: require("./sold.html")
})
export class SoldBanner {

	public image: string = require("./sold.png")

	constructor (
		public customizations: Customizations
	) {}

}