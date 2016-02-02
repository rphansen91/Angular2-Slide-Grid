import { Component, Input, NgIf, OnInit } from 'angular2/angular2';

import { SlideItems } from './slideShow';
import { SlidePositions } from './slidePositions'
import { Photo, SlideItem } from './slideItem';
import { CrossPlatform } from '../platform/crossPlatform';
import { PriceDisplay } from './price';
import { PartnersService } from '../partners/partners.service';
import { Easings } from './easings';

@Component({
	selector: "listing-display",
	inputs: ["listing: listing", "width: width", "height: height"],
	pipes: [PriceDisplay],
	directives: [NgIf],
	styles: [
		'.listingDisplay {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
		'.opening {-webkit-transform: scale(1.3); -ms-transform: scale(1.3); transform: scale(1.3); z-index: 2;}',
		'.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;background-color: rgba(130,95,168,0.95);}',
		'.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
	],
	template: `
		<div *ng-if="slide" class="listingDisplay" 
			[class.opening]="opening" 
			[style.width]="width" 
			[style.height]="height"
			[style.top] = "top"
			[style.left] = "left"
			[style.background-position]="position" 
			[style.background-image]="slide.image" 
			(click)="goToApp()" 
			(mouseenter)="startSolo()" 
			(mouseleave)="endSolo()" 
			(touchstart)="startSolo()" 
			(touchend)="endSolo()">
			
			<div class="sold" *ng-if="listing.status == 2"></div>	
			<div class="price" *ng-if="listing.price">$ {{listing.price | price}}</div>
		
		</div>
	`
})
export class ListingDisplay implements OnInit {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;
	@Input() top: number;
	@Input() left: number;

	slide: SlideItem;
	interval: ImageInterval;
	position: string;
	opening: boolean = false;
	isRunning: boolean = false;
	id: number;

	constructor(
		private _slideItems: SlideItems,
		private _slidePositions: SlidePositions,
		private _partnersService: PartnersService
	) { }

	onInit () {
		this._slideItems.add(this.listing.photos, this.width)
		.then((slide) => { this.slide = slide; })
		.then(() => { 
			return this._slidePositions.getPosition(100, this.slide.length - 1, this.width)
		})
		.then((position) => {
			this.position = position; 
		})
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
			listing.start()
		}, 200)
	}
	endSolo () {
		this.opening = false;
		clearTimeout(this.id);
		this.stop()
	}

	start() {
		if (this.slide.length > 1) {
			var show = this
			var index = this.slide.length - 2

			if (!show.isRunning) {
				show.isRunning = true;
				show.interval = new ImageInterval()
				show.interval.config(500, "easeIn")
				show.interval.resetValue()
				show.interval.startInterval(() => {
					var finished = false;

					show.interval.increaseValue()

					show._slidePositions.getPosition(show.interval.value, index, show.width)
					.then(position => show.position = position)

					if (show.interval.value == 100) {
						index--;
						if (index < 0) {
							finished = true
						} else {
							show.interval.resetValue()
						}
					}
					if (finished) {
						show.interval.stopInterval();
					}
				})
			}
		}
	}
	stop() {
		this.isRunning = false;

		this._slidePositions.getPosition(100, this.slide.length - 1, this.width)
		.then((position) => this.position = position)

		if (this.interval) {
			this.interval.stopInterval();
		}
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

	static grid: ListingGrid;

	constructor (totalWidth: number, totalHeight: number) {
		this.columns = Math.floor(totalWidth  / this.defaultWidth)
		this.rows = Math.floor(totalHeight / this.defaultHeight)

		this.width  = (totalWidth / this.columns)
		this.height = (totalHeight / this.rows)

		ListingGrid.grid = this
	}

	getTop (index: number): number {
		let row = Math.floor(index / ListingGrid.grid.columns);
		return row * this.height;
	}

	getLeft(index: number): number {
		var column = index % ListingGrid.grid.columns;
		return column * this.width;
	}
}

export class ImageInterval {
	public value: number = 0;
	public currentTime: number = 0;

	public duration: number;
	public type: string;

	easingFn: any;
	startValue: number = 0;
	endValue: number = 100;
	change: number = 100;

	ammount: number = 100;
	interval: number;

	id: number;

	constructor() { }

	config(d: number, t: string, ammount?: number, start?: number, end?: number) {
		this.duration = d;
		this.type = t;

		this.startValue = (start) ? start : 0;
		this.endValue = (end) ? end : 100;
		this.change = this.endValue - this.startValue;

		this.ammount = (ammount) ? ammount : this.ammount;
		this.interval = this.duration / this.ammount;
		this.easingFn = new Easings(this.type)
	}
	resetValue() {
		this.value = 0;
		this.currentTime = 0;
	}
	increaseValue() {
		// Fibonacci increase
		this.currentTime += this.interval;
		this.value = this.easingFn(this.currentTime, this.startValue, this.change, this.duration)
	}

	startInterval(callback: any) {
		this.id = setInterval(() => {
			callback()
		}, this.interval)
	}
	stopInterval() {
		clearInterval(this.id)
	}
}
