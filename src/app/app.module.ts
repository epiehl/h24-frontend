import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {WishlistListComponent} from './components/wishlist-list/wishlist-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WishlistDetailComponent } from './components/wishlist-detail/wishlist-detail.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WishlistListComponent,
    WishlistDetailComponent
  ],
  imports: [
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
      {path: 'index.html', component: AppComponent}
    ]),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
