import {Directive, ElementRef, Inject, Input} from "angular2/angular2"
import {CrossPlatform} from "./platform/crossPlatform"

@Directive({
	selector: "slow-scroll",
	inputs: ["scroll: scroll"],
	providers: [ElementRef]
})
export class SlowScroll {
	@Input('scroll') public scroll: boolean;

	delay: number = 40;
	change: number = 1;
	intervalId: number;

	constructor (@Inject(ElementRef) public element: ElementRef) {}

	onInit () {
		if (this.scroll) {
			this.start()
		} else {
			this.stop()
		}
	}

	start () {
		var scroller = this
		scroller.intervalId = setInterval(() => {
			if (scroller.scroll) {
				scroller.element.nativeElement.scrollTop += scroller.change;
			} else if (CrossPlatform.getInstance().device.getViewType() != "desktop") {
				this.stop()
			}
		}, scroller.delay)
	}

	stop () {
		clearInterval(this.intervalId)
	}
}