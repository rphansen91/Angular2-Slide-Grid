import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { Photo, SlideItem } from '../slide/slideItem';
import { PriceDisplay } from './price';
import { ListingGrid } from '../grid/grid.service';
import { SoldBanner } from '../sold/sold.component';
import { ImageLoader } from '../../../boot/loader/image.service';

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
	public loader: ImageLoader = new ImageLoader();

	constructor(
		public grid: ListingGrid,
		public customizations: Customizations
	) {}

	ngOnInit () {
		if (this.listing.photos.length > 1) {
            this.listing.photos = [...this.listing.photos, this.listing.photos[0]];
        }

        this.loader.completed([this.listing.photos[0].url])
        .delay(200)
		.subscribe(() => this.opacity = 1)
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