import { Injectable } from "angular2/angular2";
import { Http } from "angular2/http";

@Injectable()
export class ListingParams {
	public url: string = "https://api.antengo.com";
	public params: DefaultParams;

	constructor(
		private _http: Http
	) {
		this.params = new DefaultParams()
	}

	runSearch () {
		let body = JSON.stringify({ "id": "0", "method": "search_v2", "params": this.params })
		return this._http.post(this.url + "/supplylisting/rpc", body)
	}

	setSearchParams(search: SearchParams) {
		this.params.q = search.q;
		this.params.categoryGroupId = search.categoryGroupId;
		this.params.minPrice = search.minPrice;
		this.params.maxPrice = search.maxPrice;
		return this;
	}

	getNationalShippable () {
		this.params.shippable = 1;
		this.params.distanceStart = 0;
		this.params.distance = 5000;
		return this;
	}

	getLocalListings () {
		this.params.shippable = 0;
		this.params.distanceStart = 0;
		this.params.distance = 10;
		return this;
	}

	increaseSearchRadius () {
		this.params.distanceStart = this.params.distance;
		this.params.distance = this.params.distanceStart + 10;

		if (this.params.distanceStart >= 60) {
			this.params.distanceStart = 60
			this.params.distance = 4800
		}
		return this;
	}

	setLocation (loc: ListingLocation) {
		this.params.latitude = loc.latitude;
		this.params.longitude = loc.longitude;
		return this;
	}

	setMembershipType (type: number) {
		this.params.membershipType = type;
		return this;
	}
}

class DefaultParams {
	public q: string = "";
	public categoryGroupId: number = 0;
	public minPrice: number = 0;
	public maxPrice: number = 0;
	public distanceStart: number = 0;
	public distance: number = 0;
	public longitude: number = 0;
	public latitude: number = 0;
	public shippable: number = 0;
	public membershipType: number = 5;
	public dataSourceId: number = 0;
	public categoryId: number = 0;
	public page: number = 1;
	public hasPhoto: boolean = true;

	get () {
		return this;
	}
}

export class SearchParams {
	public q: string = "";
	public categoryGroupId: number = 0;
	public minPrice: number = 0;
	public maxPrice: number = 0;

	constructor(q: string = "", categoryGroupId: number = 0, minPrice: number = 0, maxPrice: number = 0) {
		this.q = q;
		this.categoryGroupId = categoryGroupId
		this.minPrice = minPrice
		this.maxPrice = maxPrice
	}
}

export class ListingLocation {
	public latitude: number; 
	public longitude: number;

	constructor(lat: number, lng: number) {
		this.latitude = lat;
		this.longitude = lng
	}

	isEqual(location: ListingLocation) {
		return (location.latitude == this.latitude && location.longitude == this.latitude)
	}
}