import {Component, Input, NgIf} from 'angular2/web_worker/worker';
import {Photo, SlideItems, SlideItem} from './slideShow';
import {CrossPlatform} from '../platform/crossPlatform';
import {PriceDisplay} from './price';
import {Easings} from './easings';

@Component({
	selector: "listing-display",
	inputs: ["listing: listing", "width: width", "height: height"],
	providers: [SlideItems],
	pipes: [PriceDisplay],
	directives: [NgIf],
	styles: [
		'.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
		'.listingDisplayAnimated {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
		'.opening {-webkit-transform: scale(1.5); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 100000;}',
		'.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
		'.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
	],
	template: `
		<div *ng-if="!listing.position" class="listingDisplay" (click)="goToApp()" [class.opening]="opening" [style.width]="width" [style.height]="height" [style.background-position]="slide.positioning()" [style.background-image]="slide.image" (mouseenter)="startSolo()" (mouseleave)="endSolo()" (touchstart)="startSolo()" (touchend)="endSolo()">
			<div class="sold" *ng-if="listing.status == 2"></div>
			<div class="price" *ng-if="listing.price">$ {{listing.price | price}}</div>
		</div>

		<div *ng-if="listing.position" class="listingDisplayAnimated" (click)="goToApp()" [class.opening]="opening" [style.opacity]="listing.position.opacity" [style.top]="listing.position.top" [style.left]="listing.position.left" [style.width]="width" [style.height]="height" [style.background-position]="slide.positioning()" [style.background-image]="slide.image" (mouseenter)="startSolo()" (mouseleave)="endSolo()" (touchstart)="startSolo()" (touchend)="endSolo()">
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

	constructor() { }

	onInit () {
		this.slide = SlideItems.getInstance().add(this.listing.photos, this.width)
	}
	goToApp () {
		// window.open("https://antengo.com/p?antengo/#/itemDetail/" + this.listing.id);
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
	position: ListingPositionAnimated;
}

export class ListingGrid {
	public width: number;
	public height: number;
	
	public columns: number;
	public rows: number;

	public onScreenRows: number;

	public listingColumns: NestedListings[] = [];
	public listingRows: NestedListings[] = [];

	defaultWidth: number = 175;
	defaultHeight: number = 150;

	static grid: ListingGrid;
	static intervalId: number;

	constructor (public totalWidth: number, public totalHeight: number) {
		this.columns = Math.floor(totalWidth  / this.defaultWidth)
		this.rows = Math.floor(totalHeight / this.defaultHeight)

		this.width  = (totalWidth / this.columns)
		this.height = (totalHeight / this.rows)

		this.onScreenRows = totalHeight / this.height

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
		var row = ListingGrid.grid.findListingRow(index);
		ListingGrid.grid.insertOrCreate(listing, row, ListingGrid.grid.listingRows)
	}
	addListingToColumn (listing: Listing, index: number) {
		var column = ListingGrid.grid.findListingColumn(index);
		ListingGrid.grid.insertOrCreate(listing, column, ListingGrid.grid.listingColumns)
	}

	insertOrCreate(item: Listing, index: number, arr: NestedListings[]) {
		if (arr && arr[index]) {
			arr[index].listings.push(item)
		} else {
			arr.push({ listings: [item] })
		}
	}

	addListingsAnimated(listings: Listing[], duration: number = 150) {
		listings.map(ListingGrid.grid.setPositionStartAndEnd)
		var timeout = 3500
		if (ListingGrid.intervalId) {
			clearInterval(ListingGrid.intervalId)
			timeout = 0
		}
		setTimeout(()=>{
			ListingGrid.grid.beginPlacement(listings, duration, (ListingGrid.grid.onScreenRows + 2) * ListingGrid.grid.columns)
		}, timeout)
	}

	setPositionStartAndEnd (listing: Listing, index: number) {
		var startTop = 0;//(ListingGrid.grid.totalHeight - ListingGrid.grid.height) / 2;
		var startLeft = 0;//(ListingGrid.grid.totalWidth - ListingGrid.grid.width) / 2;

		var finalTop = ListingGrid.grid.findListingRow(index) * ListingGrid.grid.height;
		var finalLeft = ListingGrid.grid.findListingColumn(index) * ListingGrid.grid.width;

		listing.position = new ListingPositionAnimated(startTop, startLeft, finalTop, finalLeft)
	}

	findListingColumn(index: number): number {
		return index % ListingGrid.grid.columns
	}

	findListingRow(index: number): number {
		return Math.floor(index / ListingGrid.grid.columns);
	}

	beginPlacement(listings: Listing[], duration: number, onScreen: number) {
		var interval = 25;
		var easingFn = new Easings("easeIn")
		var currentTime = 0;
		var currentIndex = 0; 

		var offScreenListings = listings.slice(onScreen, listings.length)
		var onScreenListings = listings.slice(0, onScreen)

		// SET ALL THE LISTINGS THAT WOULD END UP OFSCREEN TO END POSITION INITIALLY
		offScreenListings.map((listing: Listing, index: number, listings: Listing[]) => {
			listing.position.top = listing.position.end.top;
			listing.position.left = listing.position.end.left;
			listing.position.opacity = 1;
		})

		// ANIMATE IN ALL THE INITIALLY VISIBLE LISTINGS
		ListingGrid.intervalId = setInterval(() => {
			
			currentIndex = Math.floor(currentTime / duration)
			currentTime += interval

			if (currentIndex < onScreenListings.length) {
				var timeOffset     = ListingGrid.timeOffset(currentIndex, duration)
				var individualTime = currentTime - timeOffset

				
				var newTop  = easingFn(individualTime, listings[currentIndex].position.start.top, listings[currentIndex].position.getChange().top, duration)
				var newLeft = easingFn(individualTime, listings[currentIndex].position.start.left, listings[currentIndex].position.getChange().left, duration)

				// onScreenListings[currentIndex].position.opacity = easingFn(individualTime, 0, 1, duration)
				onScreenListings[currentIndex].position.top = newTop;
				onScreenListings[currentIndex].position.left = newLeft;

				if (individualTime == duration) {
					for (var i = currentIndex + 1; i < onScreenListings.length; i++) { 
						onScreenListings[i].position.start.top = newTop;
						onScreenListings[i].position.start.left = newLeft;
						onScreenListings[i].position.top = newTop;
						onScreenListings[i].position.left = newLeft;
					}
				}
			} else {
				clearInterval(ListingGrid.intervalId) 
			}
		}, interval)
	}

	static timeOffset(index: number, duration: number): number {
		var offset = index * duration;		 
		return offset
	}

	static indexOffset (index: number):number {
		var offset = index * 200//Math.min(index * 500, 1000)
		return offset
	}
}

class ListingPositionAnimated {
	top: number;
	left: number;
	start: ListingPosition;
	end: ListingPosition;

	public opacity: number = 1;

	constructor(startTop: number, startLeft: number, finalTop: number, finalLeft: number) {
		this.setPosition(startTop, startLeft)
		// this.setPosition(finalTop, finalLeft)

		this.start = new ListingPosition(startTop, startLeft)
		this.end = new ListingPosition(finalTop, finalLeft)
	}

	getChange(): ListingPosition {
		return new ListingPosition(this.end.top - this.start.top, this.end.left - this.start.left)
	}

	setPosition(top: number, left: number) {
		this.top = top;
		this.left = left;
	}
}

class ListingPosition {

	constructor(public top: number, public left: number) {}

	setPosition(top: number, left: number) {
		this.top = top;
		this.left = left;
	}
}

interface NestedListings {
	"listings": Listing[]
}
