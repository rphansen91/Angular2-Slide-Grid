// import {Http} from 'angular2/http';
import {Inject, Injectable} from "angular2/web_worker/worker";

@Injectable()
export class HttpHelper {
	public url: string = "https://api.antengo.com";
	public endpoint: string;
	public body: string;
	public http: XMLHttpRequest = new XMLHttpRequest()

	constructor() {
		// @Inject(Http) public http: Http
	}

	onResponse (callback: any) {
		this.successFunction = callback;
		return this;
	}

	onError (callback: any) {
		this.errorFunction = callback;
		return this;
	}

	request (endpoint: string, method: string, body: any) {
		this.endpoint = endpoint;
		this.body = JSON.stringify({ "id": "0", "method": method, "params": body })
		return this;
	}

	// send () {
	// 	// console.log(this.body)
	// 	return this.http.post(this.url + this.endpoint, this.body)
	// }



	send () {
        this.http.open("post", this.url + this.endpoint, true)
        this.http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        this.http.send(this.body)

        var request = this
        this.http.onreadystatechange = function () {
        	if (request.http.readyState == request.http.DONE) {
        		if (request.http.status == 200) {
        			var data = JSON.parse(request.http.response)
					request.successFunction(data)
        		} else {
        			var err = JSON.parse(request.http.response)
        			request.errorFunction(err)
        		}
        	}
        }
        return this
	}
}