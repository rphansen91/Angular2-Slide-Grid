import {Directive, ElementRef, OnInit} from "angular2/core";

import {SlowScrollService} from "./slowScroll.service";

@Directive({
	selector: "slow-scroll",
	providers: [ElementRef]
})
export class SlowScroll implements OnInit {
	constructor(
		public element: ElementRef,
		public slowScrollService: SlowScrollService
	) {}

	ngOnInit() {
		this.slowScrollService.addScroller(this)
	}
}