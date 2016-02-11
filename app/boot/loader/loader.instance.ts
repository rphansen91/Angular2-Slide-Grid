import { Injectable } from "angular2/core";

@Injectable()
export class WidgetLoaderInstance {
	public loading: boolean = true;

	toggle() {
		this.loading = !this.loading
	}
	stop() { this.loading = false; }
	start() { this.loading = true; }
}