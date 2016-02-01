import { Injectable } from "angular2/angular2";

import { SlowScroll, SlowScrollInterval } from "../slowScroll";
import { SlideItem, Photo } from "./slideItem"
import { WidgetLoaderInstance } from "../loader/loader.instance";

@Injectable()
export class SlideItems {

	private _worker: any;
	private _workerResolvers: any[];

	constructor (
		private _loader: WidgetLoaderInstance
	) {}

	initialize () {
		this._worker = (window["Worker"]) ? new window["Worker"]("./app/workers/slideWorker.js") : false;
		this._workerResolvers = [];
	}

	add(photos: Photo[], size: number): Promise<SlideItem> {
		let work = this;
		return new Promise((resolve, reject) => {
			if (work._worker) {
				work._workerResolvers.push(resolve)
				work._worker.postMessage([photos, size, work._workerResolvers.length - 1])

				work._worker.onmessage = function(e) {
					let resolver = work._workerResolvers[e.data[1]]

					if (e.data[1] >= work._workerResolvers.length - 1) {
						work._loader.toggle()
						SlowScrollInterval.getInstance().start()
					}

					resolver(e.data[0])
				}

			} else {
				resolve(new SlideItem(photos, size))
			}
		})
	}
}