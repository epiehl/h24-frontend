import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {WishlistListComponent} from './components/wishlist-list/wishlist-list.component';
import { WishlistDetailComponent } from './components/wishlist-detail/wishlist-detail.component';
import {FormsModule} from '@angular/forms';
import { TosComponent } from './components/tos/tos.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { ContactComponent } from './components/contact/contact.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WishlistListComponent,
    WishlistDetailComponent,
    TosComponent,
    DatenschutzComponent,
    ImpressumComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: environment.resourceServerAllowedUrls
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'wishlist', component: WishlistListComponent},
      {path: 'wishlist/:id', component: WishlistDetailComponent},
      {path: 'index.html', component: AppComponent},
      {path: 'impressum', component: ImpressumComponent},
      {path: 'contact', component: ContactComponent},
      {path: '', component: HomeComponent}
    ]),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
