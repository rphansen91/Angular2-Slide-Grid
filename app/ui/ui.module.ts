import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetLoader} from '../boot/loader/loader.component'
import { MainFocus } from './focus/main/main.component';
import { Opener } from './focus/opener/opener.component';
import { ShadowHover } from './display/shadow.directive';
import { PriceDisplay } from './display/listing/price';
import { SoldBanner } from './display/sold/sold.component';

import { SlidePositions } from './display/slide/slidePositions';

@NgModule({
    imports: [BrowserModule],
    providers: [SlidePositions],
    declarations: [MainFocus, Opener, PriceDisplay, ShadowHover]
})
export class UIModule {}