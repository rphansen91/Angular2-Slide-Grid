import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { FocusService, FocusedListing } from '../focus.service';

import { SlidePositions } from '../../display/slide/slidePositions';
import { PartnersService } from '../../../boot/partners/partners.service';
import { Easings } from './easings';
import { ImageLoader } from '../../../boot/loader/image.service';

@Component({
	selector: "main-focus",
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
	public loadingStream;

	public position$: Observable<string>;
	public positionStream;

	constructor (
		public focus: FocusService,
		public sanitizer: DomSanitizer,
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
		window.open("https://sellwild.com/#/itemDetail/" + this.focus.listing.id + "?p=" + this._partnersService.partner);
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

	startPositionStream(begin: number) {
		this.interval.config(400, begin, "easeIn")
		this.interval.resetValue()

		this.positionStream = Observable.interval(this.interval.interval)
		.map(() => this.interval.calculateValues())
		.map(({value, index}) => {
			
			if (index < 0) { return "" }
			
			return this._slidePositions.getPosition(
				value, 
				index, 
				this.focus.listing.width
			)
		})
		.subscribe((position: string) => {
			if (position) {
				this.position = position;
			} else {
				this.showTitle = true;
				this.endShow();
			}
		})
	}

	setDefaultImagePosition() {
		this.position = this._slidePositions.getPosition(100, 0, this.focus.listing.width);
	}
}

export class ImageInterval {
	public value: number = 0;
	public currentTime: number = 0;

	public duration: number;
	public type: string;
	public index: number;

	easingFn: any;
	startValue: number = 0;
	endValue: number = 100;
	change: number = 100;

	ammount: number = 100;
	interval: number;

	id: any;

	constructor() { }

	config(d: number, i: number, t: string, ammount?: number, start?: number, end?: number) {
		this.duration = d;
		this.type = t;
		this.index = i;

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
	calculateValues() {
		this.increaseValue()
		if (this.value > 100) {
			this.index--;
			this.resetValue();
		}

		return {
			index: this.index,
			value: this.value
		};
	}
	increaseValue() {
		// Fibonacci increase
		this.currentTime += this.interval;
		this.value = this.easingFn(this.currentTime, this.startValue, this.change, this.duration)
	}
}