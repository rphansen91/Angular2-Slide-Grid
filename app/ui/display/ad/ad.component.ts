import { Component, OnInit } from '@angular/core';

@Component({
	selector: "ad-display",
	template: require("./ad.html")
})
export class AdDisplay implements OnInit {
    ngOnInit () {
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
}