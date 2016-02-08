import {Pipe} from "angular2/core";

@Pipe({
	name: "price"
})
export class PriceDisplay {

	numbersOnly: RegExp = /\d+/g
	shortener: NumberShortener = new NumberShortener();

	transform(value: string, args: string[]): string {
		var priceStr = ""
		var numbers = value.match(this.numbersOnly)
		
		if (numbers && numbers.length) {
			var number = Number(numbers[0])
			priceStr = this.shortener.setNumber(number).shorten()
		}
		return priceStr
	}

}

class NumberShortener {
	number: number;
	formatted: string = "";
	place: ThousandsPlace;

	constructor () {}

	setNumber(number: number): NumberShortener {
		this.number = number;
		this.place = ThousandsValues.getInstance().getPlace(this.number)
		return this;
	}

	shorten(): string {
		if (this.place) {
			this.formatted = (this.number / this.place.value).toFixed(1).replace(".0", "") + " " + this.place.unit
		} else {
			this.formatted = this.number + ""
		}
		return this.formatted;
	}
}

class ThousandsValues {
	public places: ThousandsPlace[] = [];

	static isCreating: boolean = false;
	static instance: ThousandsValues;

	constructor () {
		this.places.push(new ThousandsPlace("B", 1000000000))
		this.places.push(new ThousandsPlace("M", 1000000))
		this.places.push(new ThousandsPlace("K", 1000))
	}

	static getInstance () {
		if (ThousandsValues.instance == null) {
			ThousandsValues.isCreating = true;
			ThousandsValues.instance = new ThousandsValues()
			ThousandsValues.isCreating = false;
		}

		return ThousandsValues.instance
	}

	getPlace (num: number) {
		var place = this.places.filter((place: ThousandsPlace, i: number, arr: ThousandsPlace[]) => {
			return place.isInstance(num)
		});

		return (place && place.length)? place[0]: null;
	}
}

class ThousandsPlace {

	constructor (public unit: string, public value: number) {}

	isInstance (value: number):boolean {
		return (value / this.value >= 1)
	}

}

