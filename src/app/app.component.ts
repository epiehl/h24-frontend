import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth-config';
import {Wishlist} from './models/wishlist';
import {H24BackendService} from './services/h24-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'h24-frontend-angular';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }
  get userEmail(): any {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    const emailKey = 'email';
    return claims[emailKey];
  }
  login(): void {
    this.oauthService.initLoginFlow();
  }
  logout(): void {
    this.oauthService.revokeTokenAndLogout();
  }
}
