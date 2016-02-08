import { Injectable } from "angular2/core";

import { Listing } from "../listing/listing.component"

@Injectable()
export class SlideItems {

	private _allSlidesWorker: any;

	constructor () {}

	initialize () {
		// this._allSlidesWorker = (window["Worker"]) ? new window["Worker"]("./app/workers/allSlidesWorker.js") : false;
		this._allSlidesWorker = (window["Worker"]) ? new window["Worker"]("./app/workers/formatAllListings.js") : false;
	}

	addAll(listings: Listing[], grid: any): Promise<Listing[]> {
		let work = this;
		return new Promise((resolve, reject) => {
			if (work._allSlidesWorker) {
				work._allSlidesWorker.postMessage([listings, grid])

				work._allSlidesWorker.onmessage = function(e: any) {
					resolve(e.data[0])
				}
			}
		})
	}
}