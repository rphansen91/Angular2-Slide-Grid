import {Component, View, Input, NgIf} from 'angular2/angular2';
import {Photo, SlideItems, SlideItem} from './slideShow';
import {CrossPlatform} from '../platform/crossPlatform'

@Component({
	selector: "listing-display",
	inputs: ["listing: listing", "width: width", "height: height"],
	providers: [SlideItems]
})
@View({
	directives: [NgIf],
	styles: [
		'.listingDisplay {position: relative; float: left; z-index: 1; background-color: rgba(174, 146, 204, 0.8); background-size: cover; background-repeat: no-repeat;}',
		'.opening {-webkit-transform: scale(1.3); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 11;}',
		'.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;text-shadow: black 2px 2px 3px;line-height: 35px;padding: 0px 18px;background-color: rgba(174, 146, 204, 0.8);}',
		'.title {position: absolute;bottom: 0px;right: 0px; left: 0px; color: rgb(255, 255, 255);font-size: 20px;text-shadow: black 2px 2px 3px;line-height: 35px;padding: 0px 18px;background-color: rgba(174, 146, 204, 0.8);}'
	],
	template: `
		<div class="listingDisplay" (click)="goToApp()" [class.opening]="opening" [style.width]="width" [style.height]="height" [style.background-position]="slide.positioning()" [style.background-image]="slide.image" (mouseenter)="startSolo()" (mouseleave)="endSolo()" (touchstart)="startSolo()" (touchend)="endSolo()">
			<div class="price" *ng-if="listing.price">$ {{listing.price}}</div>
		</div
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
		window.open("https://antengo.com/p?antengo/#/itemDetail/" + this.listing.id);
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
		clearTimeout(this.id)
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

	defaultWidth: number = 175;
	defaultHeight: number = 150;

	constructor (totalWidth: number, totalHeight: number) {
		this.columns = Math.floor(totalWidth  / this.defaultWidth)
		this.rows = Math.floor(totalHeight / this.defaultHeight)

		this.width  = (totalWidth / this.columns)
		this.height = (totalHeight / this.rows)
	}
}