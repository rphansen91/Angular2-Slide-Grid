import { Injectable } from "@angular/core";

@Injectable()
export class Customizations {

	public values: CustomizationsTypes = {
		cardWidth: 175,
		cardHeight: 150,
        categoryId: 0,
		fontUrl: "./app/assets/Brown-Light.ttf",
		colors: ["#8c77b6","#baadd3","#f3f1f7"],
		partnerLogo: "./app/assets/logos/antengo.png",
		partnerLogoSize: 45,
		vertical: false,
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
					if (val[1].split(",").length > 1) {
						this.values[val[0]] = val[1].split(",")
					} else if (val[1] && val[1].length) {
						try {
							this.values[val[0]] = JSON.parse(val[1])
						} catch (err) {
							console.log(err)
							this.values[val[0]] = val[1]
						}
					}
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
	partnerLogoSize: number;
	vertical: boolean;
	hasTitles: boolean;
}