import {Directive, ElementRef, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

import {SlowScrollService} from "./slowScroll.service";
import {ListingStore} from "../../boot/listings/listingStore";
import {FocusService} from "../focus/focus.service";
import {ListingGrid} from "../display/grid/grid.service";

@Directive({
	selector: "slow-scroll"
})
export class SlowScroll implements OnInit {

	constructor(
		public element: ElementRef,
		public slowScrollService: SlowScrollService,
		public store: ListingStore,
		public focus: FocusService,
		public grid: ListingGrid
	) {}

	ngOnInit() {
		this.slowScrollService.addScroller(this)
		
		Observable.fromEvent(this.element.nativeElement, "scroll")
		// .debounceTime(200)
		.filter(ev => this.checkDistance(ev))
		.subscribe(() => {
			this.store.appendToVisible(this.grid.addListingCount())
		})
	}

	checkDistance (event): boolean {
		return event.target.scrollHeight <= (event.target.scrollTop + this.grid.height + this.grid.totalWidgetHeight);
	}
}