import {Component, View, Input, ElementRef, Renderer, bootstrapWebWorker, NgFor, NgIf, Inject, Attribute, OnInit} from 'angular2/web_worker/worker';
// import {HTTP_PROVIDERS} from "/angular2/http";
import {ListingParams, ListingLocation, SearchParams} from './listings/listingParams';
import {HttpHelper} from "./listings/httpService";
import {ListingDisplay, Listing, ListingGrid} from "./display/listingDisplay"
import {CallToAction, CallToActionControl} from "./callToAction"
import {SlowScroll, SlowScrollInterval} from "./slowScroll"
import {CrossPlatform} from "./platform/crossPlatform"
import {SlideItems} from "./display/slideShow"
import {LoadingDots} from "./loadingDots"

@Component({
    selector: 'antengo-listings',
    providers: [HttpHelper, ListingParams, ElementRef, Renderer]
})
@View({
	directives: [NgFor, NgIf, ListingDisplay, CallToAction, SlowScroll, LoadingDots],
	styles: [
		'.widgetContainer {width:100%; height: 100%;background-color: rgba(174, 146, 204, 0.8);-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;-webkit-user-select: none;}',
		'.listingsColumn {position: relative; float: left; height: 100%; overflow-x: hidden; overflow-y: auto; scroll; -webkit-overflow-scrolling: touch;}',
		'.listingsColumn::-webkit-scrollbar{display:none;}',
		'.listingsRow {position: relative; width: 100%;}',
		'.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;}',
		'.scrollingContainer::-webkit-scrollbar{display:none;}',
		'.offset {position: relative; float: left;}'
	],
	templateUrl: './app/widget.html'
})
class AntengoWidget implements OnInit {
	public width: number = 500;
	public height: number = 500;

	public listings: Listing[] = [];
	public grid: ListingGrid;
	public columnOrRow: string = "row";
	
	public ctaHasBeenHidden: boolean = false;
	public ctaTimeout: number = 6000;
	public timeoutId: number;

	constructor(
		public listingParams: ListingParams,
		@Inject(ElementRef) public element: ElementRef,
		@Inject(Renderer) public renderer: Renderer
	) {}

	onInit () {
		this.setSizes()
		var location = new ListingLocation(34, -117)
		var query = new SearchParams("car")

		// AntengoWidget.display.listings = listingParams.getMockData()
		// AntengoWidget.display.grid.addListingsAnimated(AntengoWidget.display.listings)

		this.listingParams
		.setLocation(location)
		// .setSearchParams(query)
		// .getLocalListings()
		.getNationalShippable()
		.runSearch()
		.onResponse((res) => {
			this.listings = res.result.rs.splice(0, 500)
			console.log(this.listings, this.grid)
			// this.grid.addListings(this.listings)
			// AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
			// SlowScrollInterval.getInstance().start()
		})
		.onError((err) => {
			console.log(err)
		})
		// window.onresize = this.setSizes;
	}
	setSizes () {
		// this.width = this.element.nativeElement.clientWidth;
		// this.height = this.element.nativeElement.clientHeight;
		// this.renderer.setElementStyle()
		this.grid = new ListingGrid(this.width, this.height)

		// if (this.listings.length) {
		// 	this.grid.addListings(this.listings)
		// //AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
		// }
	}
	showCTA () {
		SlowScrollInterval.getInstance().start()
		CallToActionControl.getInstance().show()
		if (this.timeoutId) { clearTimeout(this.timeoutId) }
	}
	hideCTA () {
		if (this.ctaHasBeenHidden) {
			this.timeoutId = 0;
			SlowScrollInterval.getInstance().stop()
			CallToActionControl.getInstance().hide()
		} else {
			this.ctaHasBeenHidden = true;
			this.timeoutId = setTimeout(() => {
				SlowScrollInterval.getInstance().stop()
				CallToActionControl.getInstance().hide()		
			}, this.ctaTimeout)
		}
	}
	hideCTAMobile () {
		this.timeoutId = 0;
		this.ctaHasBeenHidden = true;
		CallToActionControl.getInstance().hide()
		SlowScrollInterval.getInstance().stop()
	}
}

bootstrapWebWorker(AntengoWidget);