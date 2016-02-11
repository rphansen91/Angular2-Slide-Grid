import {SlowScroll} from "./slowScroll.directive";

export class SlowScrollService {
	id: any;
	delay: number = 40;
	change: number = 1;
	isRunning: boolean = false;

	scrollers: SlowScroll[] = [];

	constructor() {}

	addScroller(scroller: SlowScroll) {
		this.scrollers.push(scroller)
	}

	setScroll(scroller: SlowScroll, index: number) {
		scroller.element.nativeElement.scrollTop += this.change;
	}

	start() {
		if (!this.isRunning) {
			this.isRunning = true;
			this.id = setInterval(() => {
				this.scrollers.forEach((s, i)=> {
					this.setScroll(s, i);
				});
			}, this.delay)
		}
	}

	stop() {
		this.isRunning = false;
		clearInterval(this.id);
	}
}