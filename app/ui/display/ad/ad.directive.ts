import {Directive, OnInit} from "@angular/core";

@Directive({
	selector: "[adInit]"
})
export class AdInit extends OnInit {
    ngOnInit () {
        console.log(window);
        setTimeout(() => {
            (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
        }, 1000);
    }
}