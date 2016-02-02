import { Injectable } from 'angular2/angular2';

import { Customizations } from '../../customizations/customizations.service';

@Injectable()
export class ListingGrid {
	public width: number;
	public height: number;

	public columns: number;
	public rows: number;

	constructor(private _customizations: Customizations) { }

	initialize(totalWidth: number, totalHeight: number) {
		this.columns = Math.floor(totalWidth / this._customizations.values.cardWidth)
		this.rows = Math.floor(totalHeight / this._customizations.values.cardHeight)

		this.width = (totalWidth / this.columns)
		this.height = (totalHeight / this.rows)
	}

	getTop(index: number): number {
		let row = Math.floor(index / this.columns);
		return row * this.height;
	}

	getLeft(index: number): number {
		var column = index % this.columns;
		return column * this.width;
	}
}