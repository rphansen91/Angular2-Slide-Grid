import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class PartnersService {

	public partners: PartnerData[] = [];
	public partner: string = "antengo";
	public isValid: boolean = false;


	constructor (
		private _http: Http
	) {}

	initialize () {
		this.setPartner()

		if (this.partner && this.partner.length) {
			this.getPartners()
			.map(res => res.json().result.rs)
			.subscribe(
				(partners) => { 
					this.partners = partners
					this.validatePartner()
				}, 
				(err) => {}
			)
		}
	}

	setPartner () {
		let url = window.location.href;

		if (url && url.indexOf("partner=") != -1) {
			this.partner = url.split("partner=")[1].split("&")[0]
		} 
	}

	removePartner () {
		this.partner = "antengo"
	}

	validatePartner () {
		if (this.partners && this.partners.length) {

			let filtered = this.partners.filter((p) => this.verifyCode(p))
			if (filtered && filtered.length) {
				this.isValid = true;
			} else {
				this.removePartner()
			}
		} else {
			this.removePartner()
		}
	}

	verifyCode (partner: PartnerData): boolean {
		return partner.code == this.partner;
	}

	getPartners () {
		let url = "https://api.antengo.com/partner/rpc"
		let body = JSON.stringify({id:0,method:"getActive",params:{}})

		if (TESTING) {
			return this._http.get("./mocks/partners.json")
		} else {
			return this._http.post(url, body)
		}
	}

}

interface PartnerData {
	id: string;
	name: string;
	membership_type: string;
	code: string;
	status: string;
	ad_partner_id: string;
	ad_site_id: string;
	landing_page: string;
}