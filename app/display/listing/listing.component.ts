import { Component, Input, OnInit } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { Customizations } from '../../customizations/customizations.service';
import { SlideItems } from '../slide/slideItems';
import { Photo, SlideItem } from '../slide/slideItem';
import { SlidePositions } from '../slide/slidePositions'
import { PriceDisplay } from './price';
import { PartnersService } from '../../partners/partners.service';
import { ListingGrid } from '../grid/grid.service';
import { FocusService } from '../../focus/focus.service';

@Component({
	selector: "listing-display",
	pipes: [PriceDisplay],
	directives: [NgIf],
	styles: [require("./listing.css")],
	template: `
		<div *ngIf="listing" class="listingDisplay" 
			[style.width]="width" 
			[style.height]="height"
			[style.top]="listing.top"
			[style.left]="listing.left"
			[style.background-image]="'url(' + listing.photos[listing.photos.length - 1].url + ')'"
			(click)="startSolo()"
            (mouseleave)="debounceEnd()"
			(mouseenter)="debounceStart()" 
			(touchstart)="debounceStart()">
			
			<div class="sold" *ngIf="listing.status == 2"></div>	
			<div class="price" *ngIf="listing.price" [style.background-color]="color">$ {{listing.price | price}}</div>
		
		</div>
	`
})
export class ListingDisplay implements OnInit {
	@Input() listing: Listing;
	@Input() width: number;
	@Input() height: number;

	public color: string;

	debounce: any;

	constructor(
		private _slidePositions: SlidePositions,
		private _partnersService: PartnersService,
		private _customizations: Customizations,
		private _listingGrid: ListingGrid,
		private _focusService: FocusService
	) {}

	ngOnInit () {
		this.color = this._customizations.values.colors[0];
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
		let listing = this.listing;
		this._focusService.activate(listing)
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
}