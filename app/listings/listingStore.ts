import {Injectable} from "angular2/core";

import {ListingParams, ListingLocation, SearchParams} from './listingParams';
import {Listing} from '../display/listing/listing.component';
import {Customizations} from '../customizations/customizations.service';

@Injectable()
export class ListingStore {

	private MAX_LISTINGS: number = 300;

	public all: Listing[] = [];
	public visible: Listing[] = [];

	constructor (
		private _listingParams: ListingParams,
        private _customizations: Customizations
	) {}

	initialize () {
		let location = new ListingLocation(34, -117)
        let search = new SearchParams(
            "",
            this._customizations.values.categoryId
        )

		return this._listingParams
		.setLocation(location)
        .setSearchParams(search)
		.getNationalShippable()
		.runSearch()
	}

	setAll (listings: Listing[]) {
		this.all = listings;
	}
	clearVisible () {
		this.visible = [];
	}
	appendToVisible (count: number) {
		this.visible = [...this.visible, ...this.all.splice(0, count)]
	}
}