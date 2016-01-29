import {Component, Input, NgIf} from 'angular2/angular2';
import {Photo, SlideItems, SlideItem} from './slideShow';
import {CrossPlatform} from '../platform/crossPlatform';
import {PriceDisplay} from './price';

import {PartnersService} from '../partners/partners.service';

@Component({
	selector: "listing-display",
	inputs: ["listing: listing", "width: width", "height: height"],
	providers: [SlideItems],
	pipes: [PriceDisplay],
	directives: [NgIf],
	styles: [
		'.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
		'.opening {-webkit-transform: scale(1.3); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 11;}',
		'.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
		'.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
	],
	template: `
		<div class="listingDisplay" (click)="goToApp()" [class.opening]="opening" [style.width]="width" [style.height]="height" [style.background-position]="slide.positioning()" [style.background-image]="slide.image" (mouseenter)="startSolo()" (mouseleave)="endSolo()" (touchstart)="startSolo()" (touchend)="endSolo()">
			<div class="sold" *ng-if="listing.status == 2"></div>
			<div class="price" *ng-if="listing.price">$ {{listing.price | price}}</div>
		</div>
	`
})
export class ListingDisplay {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;

	slide: SlideItem;
	opening: boolean = false;
	id: number;

	constructor(
		private _partnersService: PartnersService
	) { }

	onInit () {
		this.slide = SlideItems.getInstance().add(this.listing.photos, this.width)
	}
	goToApp () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
		this.opening = false;
	}
	startSolo () {
		var listing = this
		this.opening = true;
		this.id = setTimeout(() => {
			listing.slide.setPositionSize(listing.width).start()
		}, 200)
	}
	endSolo () {
		this.opening = false;
		clearTimeout(this.id);
		this.slide.stop()
	}
}

export class Listing {
	id: string;
	title: string;
	text: string;
	price: string;
	slide: SlideItem;
	photos: Photo[];
}

export class ListingGrid {
	public width: number;
	public height: number;
	
	public columns: number;
	public rows: number;

	public listingColumns: NestedListings[] = [];
	public listingRows: NestedListings[] = [];

	defaultWidth: number = 175;
	defaultHeight: number = 150;

	static grid: ListingGrid;

	constructor (totalWidth: number, totalHeight: number) {
		this.columns = Math.floor(totalWidth  / this.defaultWidth)
		this.rows = Math.floor(totalHeight / this.defaultHeight)

		this.width  = (totalWidth / this.columns)
		this.height = (totalHeight / this.rows)

		ListingGrid.grid = this
	}

	addListings(listings: Listing[], columnOrRow?: string) {
		columnOrRow = (columnOrRow == "column") ? "column" : "row";

		switch (columnOrRow) {
			case "column": listings.map(ListingGrid.grid.addListingToColumn); break;
			case "row"   : listings.map(ListingGrid.grid.addListingToRow); break;
		}
		
	}
	addListingToRow (listing: Listing, index: number) {
		var row = Math.floor(index / ListingGrid.grid.columns);
		ListingGrid.grid.insertOrCreate(listing, row, ListingGrid.grid.listingRows)
	}
	addListingToColumn (listing: Listing, index: number) {
		var column = index % ListingGrid.grid.columns;
		ListingGrid.grid.insertOrCreate(listing, column, ListingGrid.grid.listingColumns)
	}

	insertOrCreate(item: Listing, index: number, arr: NestedListings[]) {
		if (arr && arr[index]) {
			arr[index].listings.push(item)
		} else {
			arr.push({ listings: [item] })
		}
	}
}

interface NestedListings {
	"listings": Listing[]
}
