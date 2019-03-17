import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

export class ImageLoader {

	constructor() { }

	loadImage(image: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.src = image + "";
			img.onload = resolve;
			img.onerror = reject;
		})
	}

	loadImages(images: string[]): Promise<any>[] {
		return images.map(image => this.loadImage(image))
	}

	imagesLoaded(images: string[]): Promise<any[]> {
		return Promise.all(
			this.loadImages(images)
		)
	}

	completed(images: string[]): Observable<any[]> {
		return Observable.fromPromise(
			this.imagesLoaded(images)
		)
	}

}