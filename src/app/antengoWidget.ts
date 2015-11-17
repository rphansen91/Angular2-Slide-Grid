import {Component, View, Input, ElementRef, bootstrap, NgFor, NgIf, Inject, Attribute} from 'angular2/angular2';
// import {HTTP_PROVIDERS} from "/angular2/http";
import {ListingParams, ListingLocation} from './listings/listingParams';
import {HttpHelper} from "./listings/httpService";
import {ListingDisplay, Listing, ListingGrid} from "./display/listingDisplay"
import {CallToAction} from "./callToAction"
import {SlideItems} from "./display/slideShow"

@Component({
    selector: 'antengo-listings',
    providers: [HttpHelper, ListingParams, SlideItems, ElementRef],
    inputs: ["main-image: ctaImage"]
})
@View({
	directives: [NgFor, NgIf, ListingDisplay, CallToAction],
	styles: [
		'.widgetContainer {width:100%; height: 100%;background-color: rgba(174, 146, 204, 0.8);}',
		'.scrollingContainer {position: absolute; top: 0; right: 0; left: 0; bottom: 0; margin: auto; overflow-x: hidden; overflow-y: scroll;}',
		'.scrollingContainer::-webkit-scrollbar{display:none;}'
	],
	template: `	
		<div class="widgetContainer" (mouseleave)="showCTA()" (mouseenter)="hideCTA()">
			<call-to-action [hidden]="ctaHidden" [image]="ctaImage"></call-to-action>
			<div class="scrollingContainer">
				<listing-display *ng-for="#listing of listings" [listing]="listing" [width]="grid.width" [height]="grid.height"></listing-display>
			</div>
		</div>
	`
})
class AntengoWidget {
	@Input() ctaImage: string = "./app/assets/callToAction.png";
	
	public width: number;
	public height: number;

	public listings: Listing[];
	public grid: ListingGrid;

	public ctaHidden: boolean = false

	constructor(
		public listingParams: ListingParams, 
		@Inject(ElementRef) public element: ElementRef
	) {
		this.width = this.element.nativeElement.clientWidth;
		this.height = this.element.nativeElement.clientHeight;
		this.grid = new ListingGrid(this.width, this.height)

		var display = this
		var location = new ListingLocation(34, -117)

		display.listingParams
		.setLocation(location)
		.getNationalShippable()
		.runSearch()
		.onResponse((res) => {
			display.listings = res.result.rs //.splice(0, display.grid.columns * display.grid.rows);
			
			setTimeout(()=>{
				SlideItems.getInstance().startShow()
			}, 2000)
		})
		.onError((err) => {
			console.log(err)
		})
	}
	showCTA () {
		// this.slideItems.stopShow()
		SlideItems.getInstance().startShow()
		this.ctaHidden = false;
	}
	hideCTA () {
		// this.slideItems.stopShow()
		SlideItems.getInstance().stopShow()
		this.ctaHidden = true;
	}
}

bootstrap(AntengoWidget);