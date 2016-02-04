import { Component, Input, NgIf, OnInit } from 'angular2/angular2';

import { Customizations } from '../../customizations/customizations.service';
import { SlideItems } from '../slide/slideItems';
import { Photo, SlideItem } from '../slide/slideItem';
import { SlidePositions } from '../slide/slidePositions'
import { PriceDisplay } from './price';
import { PartnersService } from '../../partners/partners.service';
import { Easings } from '../easings';
import { Opener } from '../opener/opener.component';
import { BlurService } from '../../blur.component';
import { ListingGrid } from '../grid/grid.service'

@Component({
	selector: "listing-display",
	inputs: ["listing: listing", "width: width", "height: height"],
	pipes: [PriceDisplay],
	directives: [NgIf, Opener],
	styles: [
		'.listingDisplay {position: absolute; z-index: 1; background-size: cover; background-repeat: no-repeat; overflow: hidden; cursor: pointer;}',
		'.opening {z-index: 3;}',
		'.price {position: absolute;bottom: 0px;right: 0px;color: rgb(255, 255, 255);font-size: 20px;line-height: 35px;padding: 0px 18px;}',
		'.sold {position: absolute; top: -5%; right: -5%; width: 80%; height: 80%; background-image: url(./app/assets/sold_banner.png); background-size: contain;background-position: top right; background-repeat: no-repeat;}'
	],
	template: `
		<div *ng-if="slide" class="listingDisplay" 
			[class.opening]="opening" 
			[style.width]="width" 
			[style.height]="height"
			[style.top]="top"
			[style.left]="left"
			[style.background-position]="position" 
			[style.background-image]="slide.image" 
			(click)="goToApp()" 
			(mouseenter)="debounceStart()" 
			(mouseleave)="endSolo()" 
			(touchstart)="startSolo()" 
			(touchend)="endSolo()">

			<opener [show]="showControls" [id]="listing.id"></opener>
			
			<div class="sold" *ng-if="listing.status == 2"></div>	
			<div class="price" *ng-if="listing.price" [style.background-color]="color">$ {{listing.price | price}}</div>
		
		</div>
	`
})
export class ListingDisplay implements OnInit {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;
	@Input() top: number;
	@Input() left: number;

	public showControls: boolean = false;
	public color: string;

	private tmp: any;

	slide: SlideItem;
	interval: ImageInterval;
	position: string;
	opening: boolean = false;
	isRunning: boolean = false;
	id: number;
	debounce: number;

	constructor(
		private _slideItems: SlideItems,
		private _slidePositions: SlidePositions,
		private _partnersService: PartnersService,
		private _customizations: Customizations,
		private _blurService: BlurService,
		private _listingGrid: ListingGrid
	) {}

	onInit () {
		this.slide = this.listing.slide;
		this.position = this.listing.position;
		this.color = this._customizations.values.colors[0];

		// this.listing.slidePromise
		// .then((slide) => { this.slide = slide; })
		// .then(() => { 
		// 	return this._slidePositions.getPosition(100, this.slide.length - 1, this.width)
		// })
		// .then((position) => {
		// 	this.position = position; 
		// })
	}
	goToApp () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
		this.opening = false;
	}
	debounceStart () {
		if (this.debounce) { clearTimeout(this.debounce) }
		this.debounce = setTimeout(() => { this.startSolo(); }, 300)
	}
	startSolo () { 
		var listing = this
		this.setOpenStyles()
		
		this.id = setTimeout(() => {
			this._blurService.show();
			listing.start()
		}, 300)
	}
	endSolo () {
		if (this.debounce) { clearTimeout(this.debounce) }
		if (this.id) { clearTimeout(this.id) }

		this.stop();
		this.setCloseStyles();
		this._blurService.hide();
	}

	start() {
		this.showControls = true;
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

					show.position = show._slidePositions.getPosition(show.interval.value, index, show.width);

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
		this.position = this._slidePositions.getPosition(100, this.slide.length - 1, this.width);
		this.showControls = false;
		
		if (this.interval) {
			this.interval.stopInterval();
		}
	}

	setOpenStyles () {
		this.opening = true;
		this.tmp = {
			top: this.top,
			left: this.left,
			height: this.height,
			width: this.width
		}
		if (this.top != 0) {
			this.top = this.top - (this.height * 0.15);
		}
		if (this.left != 0) {
			if (this.left < ((this._listingGrid.columns - 1) * this._listingGrid.width)) {
				this.left = this.left - (this.width * 0.15);
			} else {
				this.left = this.left - (this.width * 0.3);
			}
		}
		this.height = this.height * 1.3;
		this.width = this.width * 1.3;
	}
	setCloseStyles() {
		this.opening = false;
		if (this.tmp) {
			this.top = this.tmp.top;
			this.left = this.tmp.left;
			this.height = this.tmp.height;
			this.width = this.tmp.width;
		}
	}
}

export interface Listing {
	id: string;
	title: string;
	text: string;
	price: string;
	slide: SlideItem;
	position: string;
	slidePromise: Promise<SlideItem>;
	photos: Photo[];
	top: number;
	left: number;
}

class ImageInterval {
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
