import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { Customizations } from '../../customizations/customizations.service';
import { ImagePosition } from '../slide/slidePositions';
import { Photo, SlideItem } from '../slide/slideItem';
import { PriceDisplay } from './price';
import { PartnersService } from '../../partners/partners.service';
import { ListingGrid } from '../grid/grid.service';
import { FocusService } from '../../focus/focus.service';

@Component({
	selector: "listing-display",
	pipes: [PriceDisplay],
	directives: [NgIf],
	styles: [require("./listing.less")],
	template: require("./listing.html")
})
export class ListingDisplay implements OnInit {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;
	@Input() index: number;

	public color: string;
	public opacity: number = 0;

	debounce: any;

	constructor(
		public grid: ListingGrid,
		private _partnersService: PartnersService,
		private _customizations: Customizations,
		private _focusService: FocusService
	) {}

	ngOnInit () {
		if (this.listing.photos.length > 1) {
            this.listing.photos = this.listing.photos.concat(this.listing.photos[0]);
        }
        if (this.listing.status == 2) {
        	this.listing.soldImage = `url(${require("./sold.png")})`
        }
		this.color = this._customizations.values.colors[0];

		setTimeout(()=> {
			this.opacity = 1;
		}, 200)
	}
	goToApp () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
	}
	debounceStart () {
		if (this.debounce) { clearTimeout(this.debounce) }

		this.debounce = setTimeout(() => { 
			this.startSolo(); 
		}, 300)
	}
    debounceEnd () {
        if (this.debounce) { clearTimeout(this.debounce) }
    }
	startSolo () {
		this.listing.slide = new SlideItem(this.listing.photos);
		this.listing.position = new ImagePosition().setSize(this.grid.width * 1.3).setPosition(100, this.listing.photos.length - 1).position;
		this.listing.top = this.grid.getTop(this.index);
		this.listing.left = this.grid.getLeft(this.index);
		this._focusService.activate(this.listing)
	}
}

export interface Listing {
	id?: string;
	title?: string;
	text?: string;
	price?: string;
	slide?: SlideItem;
	position?: string;
	slidePromise?: Promise<SlideItem>;
	photos?: Photo[];
	top?: number;
	left?: number;
	status?: number;
	soldImage?: string;
}