import { Injectable } from 'angular2/angular2';

import { Customizations } from '../../customizations/customizations.service';

@Injectable()
export class ListingGrid {
	public totalWidgetWidth: number;
	public totalWidgetHeight: number;
	public width: number;
	public height: number;

	public columns: number;
	public rows: number;

	constructor(private _customizations: Customizations) { }

	initialize(totalWidth: number, totalHeight: number) {
		this.totalWidgetWidth = totalWidth;
		this.totalWidgetHeight = totalHeight;
		this.columns = Math.floor(totalWidth / this._customizations.values.cardWidth) || 1;
		this.rows = Math.floor(totalHeight / this._customizations.values.cardHeight) || 1;

		this.width = (totalWidth / this.columns);
		this.height = (totalHeight / this.rows);
	}

	getTop(index: number): number {
		let row = Math.floor(index / this.columns);
		return row * this.height;
	}

	getLeft(index: number): number {
		var column = index % this.columns;
		return column * this.width;
	}

	addListingCount (): number {
		return this.columns * (this.rows + 2);
	}
}