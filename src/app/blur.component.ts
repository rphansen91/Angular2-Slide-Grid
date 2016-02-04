import {Component, Injectable} from "angular2/angular2";

@Injectable()
export class BlurService {

	active: boolean = false;

	constructor() { }

	show() {
		this.active = true;
	}

	hide() {
		this.active = false;
	}
}

@Component({
	selector: "bkgd-blur",
	styles: [
		`.blur {position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); z-index: 2; opacity: 0; visibility: hidden;
				-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;
				-moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;
				-ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;
				-o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;
				transition: opacity 0.2s ease-in, visibility 0s ease-in 0.2s;
		}`,
		`.blurActive {opacity: 1; visibility: visible;
				-webkit-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;
				-moz-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;
				-ms-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;
				-o-transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;
				transition: opacity 0.2s ease-in, visibility 0s ease-in 0s;
		}`
	],
	template: `
		<div class="blur" [class.blurActive]="blur.active"></div>
	`
})
export class Blur {

	constructor(public blur: BlurService) {}

}
