import {Component, View, Input, ElementRef, bootstrap, NgFor, NgIf, Inject, Attribute} from 'angular2/angular2';
import {HTTP_PROVIDERS} from "angular2/http";

import {Customizations} from './customizations/customizations.service';
import {ListingParams, ListingLocation, SearchParams} from './listings/listingParams';
import {PartnersService} from './partners/partners.service';
import {ListingDisplay, Listing, ListingGrid} from "./display/listingDisplay";
import {CallToAction, CallToActionControl} from "./callToAction";
import {SellIt} from "./sellIt.component";
import {SlowScroll, SlowScrollInterval} from "./slowScroll";
import {CrossPlatform} from "./platform/crossPlatform";
import {SlideItems} from "./display/slideShow";
import {SlidePositions} from './display/slidePositions';
import {WidgetLoader} from "./loader/loader.component";
import {WidgetLoaderInstance} from "./loader/loader.instance";

@Component({
    selector: 'antengo-listings',
    providers: [ListingParams, PartnersService, ElementRef, ListingGrid],
	directives: [NgFor, NgIf, ListingDisplay, CallToAction, SlowScroll, WidgetLoader, SellIt],
	styles: [
		'.widgetContainer {position: absolute; top: 0; bottom: 0; left: 0; right: 0;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;-webkit-user-select: none;}',
		'.listingsRow {position: relative; width: 100%;}',
		'.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;}',
		'.scrollingContainer::-webkit-scrollbar {background-color: transparent!important; width: 12px;}',
		'.scrollingContainer::-webkit-scrollbar-thumb {background-color: #fff;}',
		'.offset {position: relative; float: left;}'
	],
	templateUrl: './app/widget.html'
})
class AntengoWidget {
	public width: number;
	public height: number;

	public listings: Listing[] = [];
	public color: string;
	public fontUrl: string;
	public showSell: boolean = false;

	static display: AntengoWidget;

	constructor(
		public partnersService: PartnersService,
		public listingParams: ListingParams,
		public slideItems: SlideItems,
		public slidePositions: SlidePositions,
		public listingGrid: ListingGrid,
		public customizations: Customizations,
		@Inject(ElementRef) public element: ElementRef
	) {
		this.customizations.initialize()
		this.color = this.customizations.values.colors[0];
		this.fontUrl = this.customizations.values.fontUrl;

		AntengoWidget.display = this
		AntengoWidget.display.setSizes()

		var location = new ListingLocation(34, -117)
		var query = new SearchParams("car")
		
		AntengoWidget.display.listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.map(res => res.json().result.rs )
		.subscribe((listings) => {
			console.log(listings.length)
			AntengoWidget.display.listings = listings.splice(0, 300 - (300 % this.listingGrid.columns))
			.map((listing, index) => {
				listing.top = this.listingGrid.getTop(index)
				listing.left = this.listingGrid.getLeft(index)
				return listing;
			})
			console.log(AntengoWidget.display.listings)
			
		})

		partnersService.initialize();
		slideItems.initialize();
		slidePositions.initialize();
		window.onresize = this.setSizes;
	}
	setSizes () {
		AntengoWidget.display.width = AntengoWidget.display.element.nativeElement.clientWidth;
		AntengoWidget.display.height = AntengoWidget.display.element.nativeElement.clientHeight;
		this.listingGrid.initialize(AntengoWidget.display.width, AntengoWidget.display.height)
	}
	showCTA () {
		SlowScrollInterval.getInstance().start()
		CallToActionControl.getInstance().show()
		this.showSell = false;
	}
	hideCTA () {
		SlowScrollInterval.getInstance().stop()
		CallToActionControl.getInstance().hide()
		this.showSell = true;
	}
}

bootstrap(AntengoWidget, [
	HTTP_PROVIDERS,
	WidgetLoaderInstance,
	SlideItems,
	SlidePositions,
	Customizations
]);