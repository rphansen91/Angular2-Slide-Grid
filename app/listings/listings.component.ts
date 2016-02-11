import {Component, Input, OnInit} from "angular2/core";
import {NgFor} from 'angular2/common';

// PROVIDERS
import {ListingStore} from '../listings/listingStore';
import {ListingGrid} from "../display/grid/grid.service";
import {FocusService} from "../focus/focus.service";
import {WidgetLoaderInstance} from "../loader/loader.instance";
import {SlowScrollService} from "../slowScroll/slowScroll.service";

// DIRECTIVES
import {SlowScroll} from "../slowScroll/slowScroll.directive";
import {ListingDisplay, Listing} from "../display/listing/listing.component";
import {FocusControl} from "../focus/container/focus.component";

@Component({
	selector: "listings",
	providers: [ListingStore, FocusService],
	directives: [NgFor, SlowScroll, ListingDisplay, FocusControl],
	styles: [require("./listings.less")],
	template: require("./listings.html")
})
export class Listings implements OnInit {

	@Input('height') height: number;

	private MAX_LISTINGS: number = 300;

	constructor (
		public listingStore: ListingStore,
		public focus: FocusService,
		public listingGrid: ListingGrid,
		public loader: WidgetLoaderInstance,
		public slowScroll: SlowScrollService
	) {}

	ngOnInit () {
		this.listingStore.initialize()
		.subscribe((listings) => { 
			this.listingGrid.hasInitialized()
			.then(() => {
				this.setListings(listings) 
			})
		})
	}

	setListings (listings: Listing[]) {
		listings = listings.splice(0, this.MAX_LISTINGS - (this.MAX_LISTINGS % this.listingGrid.columns))

		this.listingStore.setAll(listings);
		this.listingStore.appendToVisible(this.listingGrid.addListingCount());

		this.loader.stop();
		this.slowScroll.start();
	}

	elementScroll({ target }) {
		const scrollHeight = target.scrollHeight;
		const scrollTop = target.scrollTop;
		const offset = this.listingGrid.height;

		if (this.focus.active) { this.focus.hide(); }

		if (scrollTop + offset + this.height > scrollHeight) {
			this.listingStore.appendToVisible(this.listingGrid.addListingCount())
		}
	}

}