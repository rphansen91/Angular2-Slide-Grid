import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { Customizations } from '../customizations/customizations.service';
import { FocusService, FocusedListing } from './focus.service';
import { PriceDisplay } from '../display/listing/price';
import { Opener } from './opener/opener.component';
import { SlidePositions } from '../display/slide/slidePositions';
import { PartnersService } from '../partners/partners.service';
import { Easings } from './easings';

@Component({
	selector: "main-focus",
	styleUrls: ["./app/display/listing/listing.css"],
	pipes: [PriceDisplay],
	directives: [NgIf, Opener],
	template: `
		<div *ngIf="focus.active && focus.listing" class="listingDisplay" 
			[style.width]="focus.listing.width" 
			[style.height]="focus.listing.height"
			[style.top]="focus.listing.top"
			[style.left]="focus.listing.left"
			[style.background-image]="focus.listing.slide.image" 
			[style.background-position]="position"
			(click)="openListing()"
			(mouseenter)="startShow()"
			(mouseleave)="removeFocus()">
			
			<opener [id]="focus.listing.id"></opener>

			<div class="sold" *ngIf="focus.listing.status == 2"></div>	
			<div class="price" *ngIf="focus.listing.price" [style.background-color]="color">$ {{focus.listing.price | price}}</div>
		</div>
	`
})
export class MainFocus implements OnInit {

	public color: string = "";
	public position: string = "";
	public interval: ImageInterval = new ImageInterval();

	constructor (
		public focus: FocusService,
		private _customizations: Customizations,
		private _slidePositions: SlidePositions,
		private _partnersService: PartnersService
	) {}

	ngOnInit () {
		this.color = this._customizations.values.colors[0];
	}

	openListing() {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.focus.listing.id);
	}

	removeFocus() {
		this.endShow()
		this.focus.hide()
	}

	startShow() {
		if (this.focus.listing.slide.length > 1) {
			let index = this.focus.listing.slide.length - 2

			this.interval.config(500, "easeIn")
			this.interval.resetValue()
			this.interval.startInterval(() => {
				let finished = false;

				this.position = this._slidePositions.getPosition(this.interval.value, index, this.focus.listing.width);
				this.interval.increaseValue()

				if (this.interval.value > 100) {
					index--;
					this.interval.resetValue();
				}
				if (index < 0) {
					this.endShow();
				}
			})
		} else {
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