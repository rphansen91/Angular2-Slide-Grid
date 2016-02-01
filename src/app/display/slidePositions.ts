import { Injectable } from "angular2/angular2";

@Injectable()
export class SlidePositions {

	private _worker: any;
	private _workerResolvers: any[];

	constructor() {}

	initialize () {
		this._worker = (window["Worker"]) ? new window["Worker"]("./app/workers/positionWorker.js") : false;
		this._workerResolvers = [];
	}

	getPosition(percentage: number, index: number, size: number): Promise<string> {
		let work = this;
		return new Promise((resolve, reject) => {
			if (work._worker) {
				work._workerResolvers.push(resolve)
				work._worker.postMessage([percentage, index, size, work._workerResolvers.length - 1])

				work._worker.onmessage = function(e) {
					let resolver = work._workerResolvers[e.data[1]]
					resolver(e.data[0])
				}
			} else {
				let pos = new ImagePosition().setSize(size).setPosition(percentage, index)
				resolve(pos.position)
			}
		})
	}
}

class ImagePosition {
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