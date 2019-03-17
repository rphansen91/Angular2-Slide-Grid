import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ListingParams } from './listings/listingParams';
import { Customizations } from './customizations/customizations.service';
import { PartnersService } from './partners/partners.service';
import { WidgetLoaderInstance } from './loader/loader.instance';
import { CTAService } from './cta/cta.service';
import { SlowScrollService } from '../ui/slowScroll/slowScroll.service';
import { ListingGrid } from '../ui/display/grid/grid.service';
import { SlidePositions } from '../ui/display/slide/slidePositions';

import { WidgetBootstrap } from './app.component';
import { AntengoWidget } from './antengoWidget'
import { WidgetLoader } from './loader/loader.component';
import { CTA } from './cta/cta.component';
import { SellButton } from '../ui/sell/sell.component';
import { Listings } from './listings/listings.component';
import { SlowScroll } from "../ui/slowScroll/slowScroll.directive";
import { ListingDisplay, Listing, ListingItem } from "../ui/display/listing/listing.component";
import { AdDisplay } from "../ui/display/ad/ad.component"
import { AdInit } from "../ui/display/ad/ad.directive"
import { FocusControl } from "../ui/focus/container/focus.component";
import { MainFocus } from '../ui/focus/main/main.component';
import { Opener } from '../ui/focus/opener/opener.component';
import { ShadowHover } from '../ui/display/shadow.directive';
import { PriceDisplay } from '../ui/display/listing/price';
import { SoldBanner } from '../ui/display/sold/sold.component';

@NgModule({
    imports: [BrowserModule, HttpModule],
    providers: [ListingParams, Customizations, PartnersService, WidgetLoaderInstance, CTAService, SlowScrollService, ListingGrid, SlidePositions],
    declarations: [WidgetBootstrap, AntengoWidget, WidgetLoader, CTA, SellButton, Listings, SlowScroll, ListingDisplay, ListingItem, FocusControl, MainFocus, Opener, PriceDisplay, SoldBanner, ShadowHover, AdDisplay, AdInit],
    bootstrap: [WidgetBootstrap]
})
export class AppModule {}