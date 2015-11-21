import {Component, View, Input, ElementRef, bootstrap, NgFor, NgIf, Inject, Attribute} from 'angular2/angular2';
// import {HTTP_PROVIDERS} from "/angular2/http";
import {ListingParams, ListingLocation, SearchParams} from './listings/listingParams';
import {HttpHelper} from "./listings/httpService";
import {ListingDisplay, Listing, ListingGrid} from "./display/listingDisplay"
import {CallToAction, CallToActionControl} from "./callToAction"
import {SlowScroll, SlowScrollInterval} from "./slowScroll"
import {CrossPlatform} from "./platform/crossPlatform"
import {SlideItems} from "./display/slideShow"
// import {OffsetBlocks} from "./display/offsetBlocks"

@Component({
    selector: 'antengo-listings',
    providers: [HttpHelper, ListingParams, ElementRef]
})
@View({
	directives: [NgFor, NgIf, ListingDisplay, CallToAction, SlowScroll],
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
class AntengoWidget {
	public width: number;
	public height: number;

	public listings: Listing[] = [];
	public grid: ListingGrid;
	public columnOrRow: string = "row";
	
	public ctaHasBeenHidden: boolean = false;
	public ctaTimeout: number = 6000;
	public timeoutId: number;

	static display: AntengoWidget;

	constructor(
		public listingParams: ListingParams,
		@Inject(ElementRef) public element: ElementRef
	) {
		AntengoWidget.display = this
		AntengoWidget.display.setSizes()
		var location = new ListingLocation(34, -117)
		var query = new SearchParams("car")
		AntengoWidget.display.listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.onResponse((res) => {
			AntengoWidget.display.listings = res.result.rs //.splice(0, res.result.rs.length - (res.result.rs.length % AntengoWidget.display.grid.columns))
			AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
			SlowScrollInterval.getInstance().start()
		})
		.onError((err) => {
			console.log(err)
		})
		window.onresize = this.setSizes;
	}
	setSizes () {
		AntengoWidget.display.width = AntengoWidget.display.element.nativeElement.clientWidth;
		AntengoWidget.display.height = AntengoWidget.display.element.nativeElement.clientHeight;
		AntengoWidget.display.grid = new ListingGrid(AntengoWidget.display.width, AntengoWidget.display.height)
		AntengoWidget.display.grid.addListings(AntengoWidget.display.listings, AntengoWidget.display.columnOrRow)
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

bootstrap(AntengoWidget);