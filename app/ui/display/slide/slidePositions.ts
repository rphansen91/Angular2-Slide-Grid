import { Injectable } from "@angular/core";

@Injectable()
export class SlidePositions {

	constructor() {}

	getPosition(percentage: number, index: number, size: number): string {
		return new ImagePosition().setSize(size).setPosition(percentage, index).position
	}
	
}

export class ImagePosition {
	public position: string = "0";
	public size: number;

	constructor() { }

	setSize(size: number): ImagePosition {
		this.size = size;
		return this;
	}

	setPosition(percentage: number, index: number): ImagePosition {
		var tmp = ""
		var begin = index

		for (var i = 0; i < begin; i++) {
			tmp += "-" + this.size + "px 50%, "
		}

		tmp += ((((percentage / 100) * this.size)) - this.size) + "px 50%, 0 50%"

		this.position = tmp
		return this
	}
}