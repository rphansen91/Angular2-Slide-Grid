export class Easings {
	types: string[] = ["easeOut", "easeIn"];

	constructor (public type: string) {
		if (this.types.indexOf(type) == -1) {
			this.type = this.type[0];
		}
		return this[this.type]
	}

	easeIn(t: number, s: number, c: number, d: number): number {
		t /= d;
		return c * t * t + s;
	}
	easeOut(t: number, s: number, c: number, d: number): number {
		t /= d;
		return -c * t * (t - 2) + s;
	}
}