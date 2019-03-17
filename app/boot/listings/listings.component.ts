import {Component, Input, OnInit, ElementRef} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

// PROVIDERS
import {ListingStore} from '../listings/listingStore';
import {ListingGrid} from "../../ui/display/grid/grid.service";
import {FocusService} from "../../ui/focus/focus.service";
import {WidgetLoaderInstance} from "../loader/loader.instance";
import {SlowScrollService} from "../../ui/slowScroll/slowScroll.service";
import {ImagePosition} from '../../ui/display/slide/slidePositions';
import {Photo, SlideItem} from '../../ui/display/slide/slideItem';
import {CTAService} from '../cta/cta.service';

// DIRECTIVES
import {Listing} from "../../ui/display/listing/listing.component";

@Component({
	selector: "listings",
	providers: [ListingStore, FocusService],
	styles: [require("./listings.less")],
	template: require("./listings.html")
})
export class Listings implements OnInit {

	@Input('height') height: number;

	private MAX_LISTINGS: number = 300;

	public listingsSub;
	public movementSub;

	constructor (
		public element: ElementRef,
		public listingStore: ListingStore,
		public focus: FocusService,
		public listingGrid: ListingGrid,
		public loader: WidgetLoaderInstance,
		public slowScroll: SlowScrollService,
		public cta: CTAService
	) {}

	ngOnInit () {
		this.listingsSub = this.listingsDriver();
		this.movementSub = this.movementDriver();
	}

	listingsDriver () {
		return this.listingStore.initialize()
		.subscribe((listings) => {
			this.setListings(listings);
		})
	}

	movementDriver () {
		let closest = (evt) => {
			if (evt.type == "mouseleave") {
				return {} // NEED MOUSELEAVE SO WE CAN CLOSE ANYTHING OPEN
			}
			return evt.target.closest("listing-item")
		}
		let mouseover = Observable.fromEvent(this.element.nativeElement, "mouseover", closest);
		let mouseleave = Observable.fromEvent(this.element.nativeElement, "mouseleave", closest);

		return mouseover.merge(mouseleave)
		.filter(element => element != null)
		.debounceTime(300)
		.map((element: any) => { 
			return parseInt(element.id) 
		})
		.map((index: number) => {
			if (typeof index == "number" && !isNaN(index)) {
				let focused: Listing = this.listingStore.visible[index]
				focused.slide = new SlideItem(focused.photos);
				focused.position = new ImagePosition().setSize(this.listingGrid.width * 1.3).setPosition(100, focused.photos.length - 1).position;
				focused.top = this.listingGrid.getTop(index);
				focused.left = this.listingGrid.getLeft(index);
				return focused;
			} else {
				return false;
			}
		})
		.subscribe((focused) => {
			if (focused) {
				this.focus.activate(focused);
			} else {
				this.focus.hide();
			}
		})
	}

	setListings (listings: Listing[]) {

		listings = listings.splice(0, this.MAX_LISTINGS - (this.MAX_LISTINGS % this.listingGrid.columns))

		this.listingStore.setAll(listings);
		this.listingStore.appendToVisible(this.listingGrid.initialListingCount());
		this.loader.stop();

		if (this.cta.visible) {
			this.slowScroll.start();
		}
	}
}