import {Component, View, Input, ElementRef, bootstrap, NgFor, NgIf, Inject, Attribute} from 'angular2/angular2';
// import {HTTP_PROVIDERS} from "/angular2/http";
import {ListingParams, ListingLocation} from './listings/listingParams';
import {HttpHelper} from "./listings/httpService";
import {ListingDisplay, Listing, ListingGrid} from "./display/listingDisplay"
import {CallToAction} from "./callToAction"
import {SlideItems} from "./display/slideShow"
import {SlowScroll} from "./slowScroll"

@Component({
    selector: 'antengo-listings',
    providers: [HttpHelper, ListingParams, SlideItems, ElementRef],
    inputs: ["main-image: ctaImage"]
})
@View({
	directives: [NgFor, NgIf, ListingDisplay, CallToAction, SlowScroll],
	styles: [
		'.widgetContainer {width:100%; height: 100%;background-color: rgba(174, 146, 204, 0.8);-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-touch-callout: none;-webkit-user-select: none;}',
		'.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;}',
		'.scrollingContainer::-webkit-scrollbar{display:none;}'
	],
	template: `	
		<div class="widgetContainer" (mouseleave)="showCTA()" (mouseenter)="hideCTA()" (touchstart)="hideCTA()">
			<call-to-action [hidden]="ctaHidden" [image]="ctaImage"></call-to-action>
			<slow-scroll class="scrollingContainer" [scroll]="autoScroll">
				<listing-display *ng-for="#listing of listings" [listing]="listing" [width]="grid.width" [height]="grid.height"></listing-display>
			</slow-scroll>
		</div>
	`
})
class AntengoWidget {
	@Input() ctaImage: string = "./app/assets/callToAction.png";
	
	public width: number;
	public height: number;

	public listings: Listing[];
	public grid: ListingGrid;

	public ctaHasBeenHidden: boolean = false;
	public ctaHidden : boolean = false;
	public autoScroll: boolean = true;
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

		AntengoWidget.display.listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.onResponse((res) => {
			AntengoWidget.display.listings = res.result.rs //.splice(0, display.grid.columns * display.grid.rows);
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
	}
	showCTA () {
		this.autoScroll = true;
		this.ctaHidden = false;
		if (this.timeoutId) { clearTimeout(this.timeoutId) }
	}
	hideCTA () {
		if (this.ctaHasBeenHidden) {
			this.timeoutId = 0;
			this.autoScroll = false;
			this.ctaHidden = true;
		} else {
			this.timeoutId = setTimeout(() => {
				AntengoWidget.display.autoScroll = false;
				AntengoWidget.display.ctaHidden = true;		
				AntengoWidget.display.ctaHasBeenHidden = true;
			}, this.ctaTimeout)
		}
	}
}

bootstrap(AntengoWidget);