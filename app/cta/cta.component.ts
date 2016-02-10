import { Component } from 'angular2/core';

import { CTAService } from './cta.service';

@Component({
	selector: "call-to-action",
	styles: [
		".callToAction {position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 10; visibility: visible; opacity: 1;}",
		".callToActionAnimated {-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; -o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s; transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;}",
		".callToActionRemoved {visibility: hidden; opacity: 0;}",
		".callToActionImage {position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0; height: 50%; width: 60%; min-width: 300px; max-width: 500px; background-size: contain; background-position: center; background-repeat: no-repeat;}"
	],
	template: `
		<div class="callToAction callToActionAnimated" [class.callToActionRemoved]="!cta.visible">
			<div class="callToActionImage" [style.background-image]="'url(' + image + ')'"></div>
		</div>
	`
})
export class CTA {
	image: string = require("./callToAction.png");

	constructor(
		public cta: CTAService
	) {}
}