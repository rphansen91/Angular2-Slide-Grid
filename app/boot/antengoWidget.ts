import {Component, ElementRef, OnInit} from '@angular/core';

// PROVIDERS
import {CTAService} from './cta/cta.service';
import {SlowScrollService} from '../ui/slowScroll/slowScroll.service';
import {ListingGrid} from '../ui/display/grid/grid.service';

@Component({
    selector: 'antengo-listings',
	styles: [require('./widget.less')],
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