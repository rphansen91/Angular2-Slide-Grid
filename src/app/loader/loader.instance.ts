import { Injectable } from "angular2/angular2";

@Injectable()
export class WidgetLoaderInstance {
	public loading: boolean = true;

	toggle() {
		this.loading = !this.loading
	}
	stop() { this.loading = false; }
	start() { this.loading = true; }
}