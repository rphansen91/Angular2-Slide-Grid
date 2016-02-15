import {Component, Input, OnInit, ElementRef} from "angular2/core";
import {NgFor} from 'angular2/common';
import {Observable, Subscription} from 'rxjs/Rx'

// PROVIDERS
import {ListingStore} from '../listings/listingStore';
import {ListingGrid} from "../../ui/display/grid/grid.service";
import {FocusService} from "../../ui/focus/focus.service";
import {WidgetLoaderInstance} from "../loader/loader.instance";
import {SlowScrollService} from "../../ui/slowScroll/slowScroll.service";
import {ImagePosition} from '../../ui/display/slide/slidePositions';
import {Photo, SlideItem} from '../../ui/display/slide/slideItem';

// DIRECTIVES
import {SlowScroll} from "../../ui/slowScroll/slowScroll.directive";
import {ListingDisplay, Listing} from "../../ui/display/listing/listing.component";
import {FocusControl} from "../../ui/focus/container/focus.component";

@Component({
	selector: "listings",
	providers: [ElementRef, ListingStore, FocusService],
	directives: [NgFor, SlowScroll, ListingDisplay, FocusControl],
	styles: [require("./listings.less")],
	template: require("./listings.html")
})
export class Listings implements OnInit {

	@Input('height') height: number;

	private MAX_LISTINGS: number = 300;

	public listingsSub: Subscription<any>;
	public movementSub: Subscription<any>;

	constructor (
		public element: ElementRef,
		public listingStore: ListingStore,
		public focus: FocusService,
		public listingGrid: ListingGrid,
		public loader: WidgetLoaderInstance,
		public slowScroll: SlowScrollService
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
				return {} // NEED MOUSELEAVE SO WE CAN 
			}
			return evt.target.closest("listing-display")
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
			if (index) {
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
		this.listingStore.appendToVisible(this.listingGrid.addListingCount());

		this.loader.stop();
		this.slowScroll.start();
	}
}