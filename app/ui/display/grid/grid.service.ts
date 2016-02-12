import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { Customizations } from '../../../boot/customizations/customizations.service';

@Injectable()
export class ListingGrid {
	public totalWidgetWidth: number;
	public totalWidgetHeight: number;
	public width: number;
	public height: number;

	public columns: number;
	public rows: number;

	public stream: Observable<boolean>;
	private onNext: any;

	constructor(private _customizations: Customizations) {
		this.stream = Observable.create((observer) => {
			this.onNext = observer.next.bind(observer);
		})
	}

	initialize(totalWidth: number, totalHeight: number) {
		if (totalWidth && totalHeight) {
			this.totalWidgetWidth = totalWidth;
			this.totalWidgetHeight = totalHeight;
			this.columns = Math.floor(totalWidth / this._customizations.values.cardWidth) || 1;
			this.rows = Math.floor(totalHeight / this._customizations.values.cardHeight) || 1;

			this.width = (totalWidth / this.columns);
			this.height = (totalHeight / this.rows);
			if (typeof this.onNext == "function") {
				this.onNext(true);
			}
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