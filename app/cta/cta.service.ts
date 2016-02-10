export class CTAService {

	visible: boolean = true;

	constructor() {}

	show() {
		this.visible = true;
	}

	hide() {
		this.visible = false
	}
}