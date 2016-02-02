import {Component, View, Input, ElementRef, bootstrap, NgFor, NgIf, Inject, Attribute} from 'angular2/angular2';
import {HTTP_PROVIDERS} from "angular2/http";

import {Customizations} from './customizations/customizations.service';
import {ListingParams, ListingLocation, SearchParams} from './listings/listingParams';
import {PartnersService} from './partners/partners.service';
import {ListingDisplay, Listing} from "./display/listing/listing.component";
import {ListingGrid} from "./display/grid/grid.service"
import {CallToAction, CallToActionControl} from "./callToAction";
import {SellIt} from "./sellIt.component";
import {SlowScroll, SlowScrollInterval} from "./slowScroll";
import {CrossPlatform} from "./platform/crossPlatform";
import {SlideItems} from "./display/slide/slideItems";
import {SlidePositions} from './display/slide/slidePositions';
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
		'.scrollingContainer::-webkit-scrollbar {background-color: #fff!important; width: 12px;}',
		'.scrollingContainer::-webkit-scrollbar-thumb {background-color: #ccc;}',
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
	public MAX_LISTINGS: number = 300;

	static display: AntengoWidget;

	constructor(
		public partnersService: PartnersService,
		public listingParams: ListingParams,
		public slideItems: SlideItems,
		public listingGrid: ListingGrid,
		public customizations: Customizations,
		public loader: WidgetLoaderInstance,
		@Inject(ElementRef) public element: ElementRef
	) {
		this.customizations.initialize()
		this.color = this.customizations.values.colors[0];
		this.fontUrl = this.customizations.values.fontUrl;

		AntengoWidget.display = this

		var location = new ListingLocation(34, -117)
		var query = new SearchParams("car")
		
		AntengoWidget.display.listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.map(res => res.json().result.rs )
		.subscribe(this.setListings)

		partnersService.initialize();
		slideItems.initialize();
		AntengoWidget.display.setSizes()

		window.onresize = this.setSizes;
	}

	setListings (listings: Listing[]) {
		listings = listings.splice(0, AntengoWidget.display.MAX_LISTINGS - (AntengoWidget.display.MAX_LISTINGS % AntengoWidget.display.listingGrid.columns))

		AntengoWidget.display.slideItems.addAll(listings, AntengoWidget.display.listingGrid)
		.then((_listings) => {
			AntengoWidget.display.listings = _listings;
			AntengoWidget.display.loader.stop();
			SlowScrollInterval.getInstance().start()
		})
	}
	setSizes () {
		AntengoWidget.display.loader.start();

		AntengoWidget.display.width = AntengoWidget.display.element.nativeElement.clientWidth;
		AntengoWidget.display.height = AntengoWidget.display.element.nativeElement.clientHeight;
		console.log(AntengoWidget.display.width, AntengoWidget.display.height)
		AntengoWidget.display.listingGrid.initialize(AntengoWidget.display.width, AntengoWidget.display.height)
		console.log(AntengoWidget.display.listings.length)
		if (AntengoWidget.display.listings.length) {
			AntengoWidget.display.setListings(AntengoWidget.display.listings)
		}
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