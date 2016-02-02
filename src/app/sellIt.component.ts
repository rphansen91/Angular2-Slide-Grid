import {Component, Input, NgIf} from 'angular2/angular2';

import { PartnersService } from './partners/partners.service';
import { Customizations } from './customizations/customizations.service';

@Component({
	selector: "sell-it",
	directives: [NgIf],
	styles: [
		`.sell {
			position: fixed;
			z-index: 3;
			top: 20px;
			right: 101%;
			height: 60px;
			width: 60px;
			line-height: 60px;
			border-radius: 30px;
			font-size: 32px;
			text-align: center;
			background-color: rgba(255, 255, 255, 1);
			box-shadow: 0 8px 12px 0 rgba(0,0,0,0.6);
			cursor: pointer;
			-webkit-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);
	   		-moz-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);
	    	-ms-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53); 
	     	-o-transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53); 
	        transition: right 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);
		}`,
		`.sell:hover {
			box-shadow: 0 1px 2px 0 rgba(0,0,0,0.3);
		}`,
		`.sell.show {
			right: 32px;
		}`,
		`.sellText {font-size: 18px}`
	],
	template: `
		<div class="sell" [class.show]="show" [style.color]="color" (click)="sell()" (mouseenter)="isHovering()" (mouseleave)="notHovering()">
			<span>$</span><span *ng-if="hovering" class="sellText">{{hovering}}</span>
		</div>
	`,
})
export class SellIt {

	@Input('show') show: boolean;

	public color: string;
	public hovering: string = "";
	public hoveringId: number;

	constructor (
		private _partnersService: PartnersService,
		private _customizations: Customizations
	) {
		this.color = this._customizations.values.colors[0]
	}

	sell () {
		let code = this._partnersService.partner;
		window.open("https://antengo.com/p?" + code + "/#/post");
	}

	isHovering () {
		let count = 0;
		this.hoveringId = setInterval(() => {
			this.hovering = this.getCurrentLetters(count);
			count++;
		}, 100, 3)
	}
	notHovering() {
		clearInterval(this.hoveringId)
		this.hovering = "";
	}
	getCurrentLetters (count: number): string {
		switch (count) {
			case 0: return "e";
			case 1: return "el";
			case 2: return "ell";
			default: return "ell";
		}
	}

}