import {Directive, ElementRef, Inject, Input} from "angular2/angular2"
import {CrossPlatform} from "./platform/crossPlatform"

@Directive({
	selector: "slow-scroll",
	inputs: ["direction: direction"],
	providers: [ElementRef]
})
export class SlowScroll {
	@Input('direction') public direction: number;

	interval: SlowScrollInterval;

	constructor (@Inject(ElementRef) public element: ElementRef) {
		this.interval = SlowScrollInterval.getInstance()
	}

	onInit () {
		this.interval.addScroller(this)
	}
}

export class SlowScrollInterval {
	id: number;
	delay: number = 40;
	change: number = 1;
	isRunning: boolean = false;

	scrollers: SlowScroll[] = [];

	static isCreating: boolean = false;
	static instance: SlowScrollInterval;
	static firstInterval: boolean = false

	constructor () {
		if (!SlowScrollInterval.isCreating) {
			throw new Error("Can't invoke SlowScrollInterval using keyword new. Use SlowScrollInterval.getInstance() instead.")
		}
	}

	static getInstance () {
		if (SlowScrollInterval.instance == null) {
			SlowScrollInterval.isCreating = true;
			SlowScrollInterval.instance = new SlowScrollInterval();
			SlowScrollInterval.isCreating = false;
		}

		return SlowScrollInterval.instance;
	}

	addScroller(scroller: SlowScroll) {
		this.scrollers.push(scroller)
	}

	setScroll(scroller: SlowScroll, index: number, arr: SlowScroll[]) {
		if (SlowScrollInterval.firstInterval && scroller.direction) {
			scroller.element.nativeElement.scrollTop = scroller.element.nativeElement.clientHeight;
		}
		if (scroller.direction) {
			scroller.element.nativeElement.scrollTop -= SlowScrollInterval.instance.change;
		} else {
			scroller.element.nativeElement.scrollTop += SlowScrollInterval.instance.change;
		}
	}

	start() {
		if (!this.isRunning) {
			SlowScrollInterval.firstInterval = true;
			this.isRunning = true;
			this.id = setInterval(() => {
				SlowScrollInterval.instance.scrollers.forEach(SlowScrollInterval.instance.setScroll);
				SlowScrollInterval.firstInterval = false;
			}, this.delay)
		}
	}

	stop () {
		this.isRunning = false;
		clearInterval(this.id);
	}
}