import {Easings} from './easings';

export class SlideItems {
	static instance: SlideItems;
	static isCreating: boolean = false;


	public slides: SlideItem[] = []
	public isRunning: boolean = false;
	public slideInterval: ImageInterval;

	constructor () {
		if (!SlideItems.isCreating) {
			throw new Error("You can't call new in Singleton instances! Call SlideItems.getInstance() instead.")
		}
		this.slideInterval = new ImageInterval()
	}

	static getInstance () {
		if (SlideItems.instance == null) {
			SlideItems.isCreating = true;
			SlideItems.instance = new SlideItems()
			SlideItems.isCreating = false;
		}

		return SlideItems.instance
	}

	add(photos: Photo[], size: number): SlideItem {
		var slide = new SlideItem(photos, size)

		if (photos.length > 1) {
			this.slides.push(slide)
		}
		
		return slide
	}

	startShow() {
		var backwards = 0
		var show = this;

		if (!show.isRunning) {

			show.slideInterval.config(1000, "easeIn", 10);
			show.slideInterval.resetValue()
			show.isRunning = true;

			show.slideInterval.startInterval(() => {
				if (show.slideInterval.value == 100) {
					backwards++
					show.slideInterval.resetValue()
				}

				var finishedAll = true

				show.slideInterval.increaseValue()
				show.slides.forEach((slide: SlideItem) => {
					var index = slide.getIndex(backwards)
					if (index >= 0) {
						slide.positon.setPosition(show.slideInterval.value, index)
						finishedAll = false
					}
				})

				if (finishedAll) {
					show.stopShow();
				}
			})
		}
	}
	stopShow () {
		this.slideInterval.stopInterval()
		this.isRunning = false;
	}
}

export class SlideItem {
	public length: number;
	public positon: ImagePosition;
	public interval: ImageInterval;
	public image: string;
	public positionCallback: any;

	constructor(public photos: Photo[], size: number) {
		if (this.photos.length > 1) {
			this.photos.push(this.photos[0])
		}
		
		this.length = this.photos.length;
		this.positon = new ImagePosition().setSize(size).setPosition(100, this.length - 1)
		this.image = this.photos.reverse().reduce((previous: string, current: Photo, index: number, arr: Photo[]) => {
			return previous + 'url(' + current.url + ')' + ((index != arr.length - 1) ? ',' : '')
		}, "")
		return this;
	}
	start () {
		if (this.length > 1) {
			var show = this
			var index = this.length - 2
			show.interval = new ImageInterval()
			show.interval.config(500, "easeIn")
			show.interval.resetValue()
			show.interval.startInterval(() => {
				var finished = false;

				show.interval.increaseValue()
				show.positon.setPosition(show.interval.value, index)

				if (show.interval.value == 100) {
					index--;
					if (index < 0) {
						finished = true
					} else {
						show.interval.resetValue()
					}
				}
				if (finished) { show.interval.stopInterval(); }
			})
		}
	}
	stop () {
		if (this.interval) {
			this.interval.stopInterval();
		}
	}
	positioning () {
		if (this.positon && this.positon.position) {
			return this.positon.position
		} else {
			return "0";
		}
	}
	getIndex (backward: number):number {
		return this.length - backward - 2
	}
}

export class Photo {
	url: string;
	thumbUrl: string;
}

export class ImageInterval {
	public value: number = 0;
	public currentTime: number = 0;

	public duration: number;
	public type: string;

	easingFn: any;
	startValue: number = 0;
	endValue: number = 100;
	change: number = 100;

	ammount: number = 100;
	interval: number;

	id: number;

	constructor() { }

	config(d: number, t: string, ammount?: number, start?: number, end?: number) {
		this.duration = d;
		this.type = t;

		this.startValue = (start) ? start : 0;
		this.endValue = (end) ? end : 100;
		this.change = this.endValue - this.startValue;

		this.ammount = (ammount) ? ammount : this.ammount;
		this.interval = this.duration / this.ammount;
		this.easingFn = new Easings(this.type)
	}
	resetValue() {
		this.value = 0;
		this.currentTime = 0;
	}
	increaseValue() {
		// Fibonacci increase
		this.currentTime += this.interval;
		this.value = this.easingFn(this.currentTime, this.startValue, this.change, this.duration)
	}

	startInterval(callback: any) {
		this.id = setInterval(() => {
			callback()
		}, this.interval)
	}
	stopInterval() {
		clearInterval(this.id)
	}
}

export class ImagePosition {
	public position: string = "0";
	public size: number;

	constructor() {
		return this;
	}

	setSize(size: number): ImagePosition {
		this.size = size;
		return this;
	}

	setPosition(percentage: number, index: number): ImagePosition {
		var tmp = ""
		var begin = index

		for (var i = 0; i < begin; i++) {
			tmp += "-" + this.size + "px, "
		}

		tmp += ((((percentage / 100) * this.size)) - this.size) + "px, 0"

		this.position = tmp
		return this
	}
}