import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Observable, Subscription } from 'rxjs/Rx';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { FocusService, FocusedListing } from '../focus.service';
import { PriceDisplay } from '../../display/listing/price';
import { SoldBanner } from '../../display/sold/sold.component';
import { Opener } from '../opener/opener.component';
import { SlidePositions } from '../../display/slide/slidePositions';
import { PartnersService } from '../../../boot/partners/partners.service';
import { Easings } from './easings';
import { WidgetLoader } from '../../../boot/loader/loader.component';

@Component({
	selector: "main-focus",
	pipes: [PriceDisplay],
	directives: [NgIf, Opener, SoldBanner, WidgetLoader],
	providers: [SlidePositions],
	styles: [require("../../display/listing/listing.less")],
	template: require("./main.html")
})
export class MainFocus implements OnInit {

	public color: string = "";
	public position: string = "";
	public showTitle: boolean = false;
	public loading: boolean = false;
	public hasTitles: boolean = true;
	public interval: ImageInterval = new ImageInterval();
	public loader: ImageLoader = new ImageLoader();
	public loadingStream: Subscription<boolean[]>;
	public positionStream: Subscription<string>;

	constructor (
		public focus: FocusService,
		private _customizations: Customizations,
		private _slidePositions: SlidePositions,
		private _partnersService: PartnersService
	) {}

	ngOnInit () {
		this.color = this._customizations.values.colors[0];
		this.hasTitles = this._customizations.values.hasTitles;

		this.focus.stream.subscribe(
			(active) => { 
				if (active) {
					this.startShow();
				} else {
					this.endShow();
					this.showTitle = false;
				}
			},
			(err) => {},
			() => {}
		)
	}

	openListing() {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.focus.listing.id);
	}

	removeFocus() {
		this.endShow();
		this.showTitle = false;
		this.focus.hide();
	}

	startShow() {
		if (this.focus.listing.slide.length > 1) {
			let index = this.focus.listing.slide.length - 2
			
			this.loading = true;

			this.loadingStream = this.loader.completed(
				this.focus.listing.photos.map(photo => photo.url)
			)
			.subscribe(
				(val) => {},
				(err) => {
					this.loading = false;
					this.showTitle = true;
					this.setDefaultImagePosition();
				},
				() => {
					this.loading = false;
					this.startPositionStream(index)
				}
			)
		} else {
			this.showTitle = true;
			this.setDefaultImagePosition();
		}
	}

	endShow() {
		this.loading = false;
		this.setDefaultImagePosition();
		if (this.loadingStream) {
			this.loadingStream.unsubscribe();
		}
		if (this.positionStream) {
			this.positionStream.unsubscribe();
		}
	}

	startPositionStream(begginingIndex: number) {
		this.interval.config(400, "easeIn")
		this.interval.resetValue()

		this.positionStream = Observable.interval(this.interval.interval)
		.map(() => {
			this.interval.increaseValue()
			if (this.interval.value > 100) {
				begginingIndex--;
				this.interval.resetValue();
			}
			if (begginingIndex < 0) {
				this.showTitle = true;
				this.endShow();
			}
			return this._slidePositions.getPosition(
				this.interval.value, 
				begginingIndex, 
				this.focus.listing.width
			)
		})
		.subscribe((position: string) => this.position = position)
	}

	setDefaultImagePosition() {
		this.position = this._slidePositions.getPosition(100, 0, this.focus.listing.width);
	}
}

export class ImageLoader {

	constructor () {}

	loadImage(image: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.src = image + "";
			img.onload = resolve;
			img.onerror = reject;
		})
	}

	loadImages(images: string[]): Promise<any>[] {
		return images.map(image => this.loadImage(image))
	}

	imagesLoaded(images: string[]): Promise<any[]> {
		return Promise.all(
			this.loadImages(images)
		)
	}

	completed(images: string[]): Observable<any[]> {
		return Observable.fromPromise(
			this.imagesLoaded(images)
		)
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

	id: any;

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
}