import { bootstrap } from 'angular2/platform/browser';
import { Component, ViewEncapsulation } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';

import { ListingParams } from './listings/listingParams';
import { Customizations } from './customizations/customizations.service';
import { PartnersService } from './partners/partners.service';
import { WidgetLoaderInstance } from "./loader/loader.instance";

import { AntengoWidget } from './antengoWidget'
import { WidgetLoader } from "./loader/loader.component";

@Component({
	selector: "widget",
	providers: [Customizations, PartnersService, WidgetLoaderInstance],
	directives: [AntengoWidget, WidgetLoader],
	styles: [require('./style.css')],
	encapsulation: ViewEncapsulation.None,
	template: `
		<antengo-listings 
			class="listingContainer"
			[style.background-color]="customizations.values.colors[0]">

		</antengo-listings>

		<widget-loader></widget-loader>
	`
})
class WidgetBootstrap {

	constructor (
		private _partners: PartnersService,
		public customizations: Customizations
	) {
		this.customizations.initialize();
		this._partners.initialize();
	}
	
}

bootstrap(WidgetBootstrap, [
	HTTP_PROVIDERS,
	ListingParams
]);