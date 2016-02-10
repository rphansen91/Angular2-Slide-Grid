import {Component, ElementRef, OnInit} from 'angular2/core';

// PROVIDERS
import {CTAService} from "./cta/cta.service";
import {SlowScrollService} from "./slowScroll/slowScroll.service";
import {ListingGrid} from "./display/grid/grid.service";

// DIRECTIVES
import {CTA} from "./cta/cta.component";
import {SellButton} from "./sell/sell.component";
import {Listings} from "./listings/listings.component";

@Component({
    selector: 'antengo-listings',
    providers: [ElementRef, CTAService, SlowScrollService, ListingGrid],
	directives: [CTA, SellButton, Listings],
	template: require('./widget.html')
})
export class AntengoWidget implements OnInit {
	public width: number;
	public height: number;

	public showSell: boolean = false;

	constructor(
		public element: ElementRef,
		public cta: CTAService,
		public slowScroll: SlowScrollService,
		public listingGrid: ListingGrid
	) {}

	ngOnInit () {
		this.setSizes();

		window.onresize = () => { this.setSizes() };
	}

	setSizes () {
		this.width = this.element.nativeElement.clientWidth;
		this.height = this.element.nativeElement.clientHeight;

		this.listingGrid.initialize(this.width, this.height);
	}
	showCTA () {
		this.slowScroll.start()
		this.cta.show();
		this.showSell = false;
	}
	hideCTA () {
		this.slowScroll.stop();
		this.cta.hide();
		this.showSell = true;
	}
}