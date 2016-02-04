import { Injectable } from "angular2/angular2";

import { Listing } from "../display/listing/listing.component";
import { ListingGrid } from "../display/grid/grid.service";

@Injectable()
export class FocusService {

	public active: boolean = false;
	public listing: FocusedListing;

	constructor(
		private _grid: ListingGrid
	) { }

	activate(listing: Listing) {
		this.listing = this.getActiveListingValues(listing);
		this.active = true;
	}

	hide() {
		this.active = false;
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
	height: number;
	width: number;
}