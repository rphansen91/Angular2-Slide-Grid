import { bootstrap } from 'angular2/platform/browser';
import {Component, View, Input, ElementRef, Inject, Attribute} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {HTTP_PROVIDERS} from "angular2/http";

import {Customizations} from './customizations/customizations.service';
import {ListingStore} from './listings/listingStore';
import {ListingParams} from './listings/listingParams';
import {PartnersService} from './partners/partners.service';
import {ListingDisplay, Listing} from "./display/listing/listing.component";
import {ListingGrid} from "./display/grid/grid.service"
import {CallToAction, CallToActionControl} from "./callToAction";
import {SellButton} from "./sell/sell.component";
import {SlowScroll, SlowScrollInterval} from "./slowScroll";
import {SlideItems} from "./display/slide/slideItems";
import {SlidePositions} from './display/slide/slidePositions';
import {WidgetLoader} from "./loader/loader.component";
import {WidgetLoaderInstance} from "./loader/loader.instance";
import {FocusControl} from "./focus/focus.component";
import {FocusService} from "./focus/focus.service";

@Component({
    selector: 'antengo-listings',
    providers: [PartnersService, ListingStore, ListingGrid, ElementRef, FocusService],
	directives: [NgFor, ListingDisplay, CallToAction, SlowScroll, WidgetLoader, SellButton, FocusControl],
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

	public color: string;
	public fontUrl: string;
	public showSell: boolean = false;
	public MAX_LISTINGS: number = 300;

	constructor(
		public partnersService: PartnersService,
		public slideItems: SlideItems,
		public listingGrid: ListingGrid,
		public listingStore: ListingStore,
		public customizations: Customizations,
		public loader: WidgetLoaderInstance,
		public focus: FocusService,
		@Inject(ElementRef) public element: ElementRef
	) {
		this.customizations.initialize()
		this.color = this.customizations.values.colors[0];
		this.fontUrl = this.customizations.values.fontUrl;
		
		this.listingStore.initialize()
		.subscribe((listings) => { this.setListings(listings) })

		partnersService.initialize();
		slideItems.initialize();
		
		this.setSizes()

		window.onresize = () => { this.setSizes() };
	}

	setListings (listings: Listing[]) {
		listings = listings.splice(0, this.MAX_LISTINGS - (this.MAX_LISTINGS % this.listingGrid.columns))
		this.listingStore.clearVisible()
		this.slideItems.addAll(listings, this.listingGrid)
		.then((_listings) => {
			this.listingStore.setAll(_listings);
			this.listingStore.appendToVisible(this.listingGrid.addListingCount())
			this.loader.stop();
			SlowScrollInterval.getInstance().start()
		})
	}
	setSizes () {
		this.loader.start();

		this.width = this.element.nativeElement.clientWidth;
		this.height = this.element.nativeElement.clientHeight;
		this.listingGrid.initialize(this.width, this.height)

		if (this.listingStore.visible.length) {
			this.setListings([...this.listingStore.visible, ...this.listingStore.all])
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
	elementScroll({ target }) {
		let scrollHeight = target.scrollHeight;
		let scrollTop = target.scrollTop;
		let offset = this.listingGrid.height;
		if (this.focus.active) { this.focus.hide(); }
		if (scrollTop + offset + this.height > scrollHeight) {
			this.listingStore.appendToVisible(this.listingGrid.addListingCount())
		}
	}
}

bootstrap(AntengoWidget, [
	HTTP_PROVIDERS,
	ListingParams,
	WidgetLoaderInstance,
	SlideItems,
	SlidePositions,
	Customizations
]);