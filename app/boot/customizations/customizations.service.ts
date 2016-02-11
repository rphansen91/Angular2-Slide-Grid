import { Injectable } from "angular2/core";

@Injectable()
export class Customizations {

	public values: CustomizationsTypes = {
		cardWidth: 175,
		cardHeight: 150,
        categoryId: 0,
		fontUrl: "./app/assets/Brown-Light.ttf",
		colors: ["#8c77b6","#baadd3","#f3f1f7"],
		partnerLogo: "./app/assets/logos/nbc.png",
		hasTitles: true
	}
	
	constructor () {}

	initialize () {
		let url = window.location.href.split("?");
		if (url[1]) {
			let values = url[1].split("&")
			.map((val) => {
				return val.split("=")
			})
			values.forEach((val)=>{
				if (this.values[val[0]] || this.values[val[0]] >= 0) {
					this.values[val[0]] = (val[1].split(",").length > 1) ? val[1].split(","): JSON.parse(val[1]) ;
				}
			})
		}
	}
}

interface CustomizationsTypes {
	cardWidth: number;
	cardHeight: number;
    categoryId: number;
	fontUrl: string;
	colors: string[];
	partnerLogo: string;
	hasTitles: boolean;
}