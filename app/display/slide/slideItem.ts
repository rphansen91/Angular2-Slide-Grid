export class SlideItem {
	public length: number;
	public image: string;

	public isRunning: boolean = false;

	constructor(public photos: Photo[]) {
		if (this.photos.length > 1) {
			this.photos.push(this.photos[0])
		}

		this.length = this.photos.length;
		this.image = this.photos.reverse().reduce((previous: string, current: Photo, index: number, arr: Photo[]) => {
			return previous + 'url(' + current.url + ')' + ((index != arr.length - 1) ? ',' : '')
		}, "")
		return this;
	}
}

export class Photo {
	url: string;
	thumbUrl: string;
}