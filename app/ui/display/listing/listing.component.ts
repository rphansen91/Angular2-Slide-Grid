import { Component, Directive, Input, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/delay';

import { Customizations } from '../../../boot/customizations/customizations.service';
import { Photo, SlideItem } from '../slide/slideItem';
import { ListingGrid } from '../grid/grid.service';
import { ImageLoader } from '../../../boot/loader/image.service';

@Directive({
	selector: "listing-item",
})
export class ListingItem {}
@Component({
	selector: "listing-display",
	styles: [require("./listing.less")],
	template: require("./listing.html")
})
export class ListingDisplay implements OnInit, OnDestroy {
	@Input() listing: Listing;
	@Input() ad: string;
	@Input() width: number;
	@Input() height: number;
	@Input() index: number;

	public adtimer: any;
	public opacity: number = 0;
	public loader: ImageLoader = new ImageLoader();

	constructor(
		public grid: ListingGrid,
		public customizations: Customizations
	) {}
	ngOnDestroy () {
		clearTimeout(this.adtimer)
	}
	ngOnInit () {
		this.listing.photos = this.listing.photos.map(p => ({ url: p["320x320Url"] || p["url"] }));

		if (this.listing.photos.length > 1) {
			this.listing.photos = [...this.listing.photos, this.listing.photos[0]];
		}

		this.loader.completed([this.listing.photos[0].url])
		.delay(200)
		.subscribe(() => {
			this.opacity = 1;
			if (this.ad) {
				(window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
			}
		})
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