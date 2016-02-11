import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { FocusService, FocusedListing } from '../focus.service';
import { PriceDisplay } from '../../display/listing/price';
import { Opener } from '../opener/opener.component';
import { SlidePositions } from '../../display/slide/slidePositions';
import { PartnersService } from '../../../boot/partners/partners.service';
import { Easings } from './easings';

@Component({
	selector: "main-focus",
	pipes: [PriceDisplay],
	directives: [NgIf, Opener],
	providers: [SlidePositions],
	styles: [require("../../display/listing/listing.less")],
	template: require("./main.html")
})
export class MainFocus implements OnInit {

	public color: string = "";
	public position: string = "";
	public showTitle: boolean = false;
	public hasTitles: boolean = true;
	public interval: ImageInterval = new ImageInterval();

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

			this.interval.config(500, "easeIn")
			this.interval.resetValue()
			this.interval.startInterval(() => {
				this.position = this._slidePositions.getPosition(this.interval.value, index, this.focus.listing.width);
				this.interval.increaseValue()

				if (this.interval.value > 100) {
					index--;
					this.interval.resetValue();
				}
				if (index < 0) {
					this.showTitle = true;
					this.endShow();
				}
			})
		} else {
			this.showTitle = true;
			this.setDefaultImagePosition();
		}
	}

	endShow() {
		this.setDefaultImagePosition();
		if (this.interval) {
			this.interval.stopInterval();
		}
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

	startInterval(callback: any) {
		if (this.id) {
			clearInterval(this.id)
		}
		this.id = setInterval(() => {
			callback()
		}, this.interval)
	}
	stopInterval() {
		clearInterval(this.id)
	}
}