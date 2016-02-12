import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Observable } from 'rxjs/Rx';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { ImagePosition } from '../slide/slidePositions';
import { Photo, SlideItem } from '../slide/slideItem';
import { PriceDisplay } from './price';
import { PartnersService } from '../../../boot/partners/partners.service';
import { ListingGrid } from '../grid/grid.service';
import { FocusService } from '../../focus/focus.service';
import { SoldBanner } from '../sold/sold.component';

@Component({
	selector: "listing-display",
	pipes: [PriceDisplay],
	directives: [NgIf, SoldBanner],
	styles: [require("./listing.less")],
	template: require("./listing.html")
})
export class ListingDisplay implements OnInit {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;
	@Input() index: number;

	public opacity: number = 0;

	constructor(
		public grid: ListingGrid,
		public customizations: Customizations,
		private _partnersService: PartnersService,
		private _focusService: FocusService
	) {}

	ngOnInit () {
		if (this.listing.photos.length > 1) {
            this.listing.photos = [...this.listing.photos, this.listing.photos[0]];
        }

		setTimeout(()=> {
			this.opacity = 1;
		}, 200)
	}
	goToApp () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/itemDetail/" + this.listing.id);
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