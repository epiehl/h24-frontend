import {Component, OnDestroy, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth-config';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent} from 'ngx-cookieconsent';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'h24-frontend-angular';
  searchTerm: string;

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private ccService: NgcCookieConsentService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
    });
    this.oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit(): void {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.ccService.getConfig().content = this.ccService.getConfig().content || {};
    // Override default messages with the translated ones
    this.ccService.getConfig().content.header = 'Diese Seite nutzt Cookies!';
    this.ccService.getConfig().content.message = 'Wir nutzen Cookies, weil eine Website, mit persönlichem Content, ohne Cookies nicht betreibbar ist. Ohne Cookies müssen wir die Wunschlisten-Features für dich deaktivieren';
    this.ccService.getConfig().content.dismiss = 'Alles klar!';
    this.ccService.getConfig().content.allow = 'Cookies erlauben';
    this.ccService.getConfig().content.deny = 'Nicht erlauben';
    this.ccService.getConfig().content.link = 'Hier erfährst du mehr über Cookies';

    this.ccService.destroy(); // remove previous cookie bar (with default messages)
    this.ccService.init(this.ccService.getConfig()); // update config with translated messages
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
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
    this.oauthService.logOut();
  }

  navigateToItemSearch(dropDown: NgbDropdown, term: string): void {
    console.log(this.searchTerm);
    this.router.navigate(['/items'], {queryParams: {searchTerm: term}}).then(() => {});
  }
}
