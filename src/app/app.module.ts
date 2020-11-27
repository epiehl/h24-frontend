import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {WishlistListComponent} from './components/wishlist/wishlist-list/wishlist-list.component';
import {WishlistDetailComponent} from './components/wishlist/wishlist-detail/wishlist-detail.component';
import {FormsModule} from '@angular/forms';
import {TosComponent} from './components/misc/tos/tos.component';
import {DatenschutzComponent} from './components/misc/datenschutz/datenschutz.component';
import {ImpressumComponent} from './components/misc/impressum/impressum.component';
import {ContactComponent} from './components/misc/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './components/misc/home/home.component';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule} from 'ngx-google-analytics';
import {ItemListComponent} from './components/item/item-list/item-list.component';
import {UnauthenticatedComponent} from './components/misc/unauthenticated/unauthenticated.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { ItemCardComponent } from './components/item/item-card/item-card.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieConsentDomain
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    WishlistListComponent,
    WishlistDetailComponent,
    TosComponent,
    DatenschutzComponent,
    ImpressumComponent,
    ContactComponent,
    HomeComponent,
    ItemListComponent,
    UnauthenticatedComponent,
    ItemDetailComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'wishlists/:id', component: WishlistDetailComponent},
      {path: 'wishlists', component: WishlistListComponent},
      {path: 'items', component: ItemListComponent},
      {path: 'items/:sku', component: ItemDetailComponent},
      {path: 'index.html', component: HomeComponent},
      {path: 'impressum', component: ImpressumComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'notloggedin', component: UnauthenticatedComponent},
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: '**', component: HomeComponent}
    ]),
    BrowserAnimationsModule,
    FormsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    /*AdsenseModule.forRoot(
      {
        adClient: environment.adClient
      }
    ),*/
    NgbModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
