import { Directive, Input, OnInit, ElementRef, Renderer } from "angular2/core";

import { Customizations } from '../customizations/customizations.service';

@Directive({
	selector: "[shadowHover]",
	providers: [ElementRef, Renderer],
	host: {
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()',
	}
})
export class ShadowHover implements OnInit {

	@Input('shadowHover') shadow: number[];

	public color: string;

	constructor (
		private _element: ElementRef,
		private _renderer: Renderer,
		private _customizations: Customizations
	) {}

	ngOnInit () {
		this.color = this._customizations.values.colors[0];

		this.shadow = this.shadow
		.filter(val => typeof val == "number");

		this.setBoxShadow(this.getShadowValue(1))
	}

	onMouseEnter() {
		this.setBoxShadow(this.getShadowValue(0.25))
	}

	onMouseLeave() {
		this.setBoxShadow(this.getShadowValue(1))
	}

	getShadowValue(multiplier: number) {
		return this.shadow.reduce((prev, curr, index) => { 
			return prev + ((curr * multiplier) + "px ")
		}, "") + this.color;
	}

	setBoxShadow (value) {
		this._renderer.setElementStyle(this._element.nativeElement, "box-shadow", value)
	}

}