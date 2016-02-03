import {Injectable} from "angular2/angular2";

import {ListingParams, ListingLocation, SearchParams} from './listingParams';
import {Listing} from '../display/listing/listing.component';

@Injectable()
export class ListingStore {

	private MAX_LISTINGS: number = 300;

	public all: Listing[] = [];
	public visible: Listing[] = [];

	constructor (
		private _listingParams: ListingParams
	) {}

	initialize () {
		let location = new ListingLocation(34, -117)

		return this._listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.map(res => res.json().result.rs)
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