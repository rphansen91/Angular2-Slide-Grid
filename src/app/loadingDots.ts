import {Component, View} from "angular2/web_worker/worker"

@Component({
	selector: "dots"
})
@View({
	styles: [
		'.dots {width: 16px;height: 16px;background-color: #ffffff;-webkit-border-radius: 30px;-moz-border-radius: 30px;-ms-border-radius: 30px;-o-border-radius: 30px;border-radius: 30px;display: inline-block;-webkit-animation: bouncedelay 1.4s infinite ease-in-ou',
		'.dots .bounce1 {-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}',
		'.dots .bounce2 {-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}'
	],
	template: `
		<div class="dots"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
	`
})
export class LoadingDots {}

