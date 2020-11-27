import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // issuer: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_7aM1pNc0j',
  issuer: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_7aM1pNc0j',
  redirectUri: window.location.origin + '/index.html',
  clientId: '4oan27s115ko6uf44ga9ice9o',
  responseType: 'code',
  scope: 'openid',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  timeoutFactor: 0.75,
  logoutUrl: 'https://h24-local.auth.eu-central-1.amazoncognito.com/logout',
  postLogoutRedirectUri: window.location.origin
};
