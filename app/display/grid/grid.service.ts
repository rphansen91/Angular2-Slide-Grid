import { Injectable } from 'angular2/core';

import { Customizations } from '../../customizations/customizations.service';

@Injectable()
export class ListingGrid {
	public totalWidgetWidth: number;
	public totalWidgetHeight: number;
	public width: number;
	public height: number;

	public columns: number;
	public rows: number;

	public initialized: Promise<boolean>;
	public resolver: any;
	public rejecter: any;

	constructor(private _customizations: Customizations) { }

	initializePromise() {
		this.initialized = new Promise((resolve, reject) => {
			this.resolver = resolve;
			this.rejecter = reject;
		})
	}

	hasInitialized () {
		if (this.initialized == null) {
			this.initializePromise();
		}
		return this.initialized;
	}

	initialize(totalWidth: number, totalHeight: number) {
		this.hasInitialized();

		if (totalWidth && totalHeight) {
			this.totalWidgetWidth = totalWidth;
			this.totalWidgetHeight = totalHeight;
			this.columns = Math.floor(totalWidth / this._customizations.values.cardWidth) || 1;
			this.rows = Math.floor(totalHeight / this._customizations.values.cardHeight) || 1;

			this.width = (totalWidth / this.columns);
			this.height = (totalHeight / this.rows);

			this.resolver(true);
		}
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

	getFirstRowIndex(index: number) {
		return Math.floor(index / this.columns) * this.columns;
	}
}