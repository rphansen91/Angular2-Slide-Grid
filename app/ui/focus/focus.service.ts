import { Injectable } from "angular2/core";

import { Listing } from "../display/listing/listing.component";
import { ListingGrid } from "../display/grid/grid.service";

import { Observable } from "rxjs/Rx";

@Injectable()
export class FocusService {

	public active: boolean = false;
	public listing: FocusedListing;

	public stream: Observable<boolean>;
	public nextListing: any;

	constructor(
		private _grid: ListingGrid
	) {
		this.stream = Observable.create((observer) => {
			this.nextListing = observer._next;
		})
	}

	activate(listing: Listing) {
		this.listing = this.getActiveListingValues(listing);
		this.active = true;
		this.nextListing(this.active);
	}

	hide() {
		this.listing = {};
		this.active = false;
		this.nextListing(this.active);
	}

	getActiveListingValues(listing: Listing): FocusedListing {
		let focused: FocusedListing = {};

		Object.keys(listing).map((key) => { focused[key] = listing[key]; })

		if (focused.top != 0) {
			focused.top = focused.top - (this._grid.height * 0.15);
		}
		if (focused.left != 0) {
			if (focused.left < ((this._grid.columns - 1) * this._grid.width)) {
				focused.left = focused.left - (this._grid.width * 0.15);
			} else {
				focused.left = focused.left - (this._grid.width * 0.3);
			}
		}
		focused.height = this._grid.height * 1.3;
		focused.width = this._grid.width * 1.3;
		return focused;
	}
}

export interface FocusedListing extends Listing {
	height?: number;
	width?: number;
}