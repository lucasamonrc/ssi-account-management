import { Log, OidcClientSettings, User, UserManager} from 'oidc-client-ts';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const settings: OidcClientSettings = {
  authority: 'https://connect.trinsic.cloud',
  client_id: 'ssi-account-manager',
  redirect_uri: `${baseUrl}/auth`,
  post_logout_redirect_uri: `${baseUrl}/`,
  response_type: 'code',
  scope: 'openid',
  extraQueryParams: {
    'trinsic:ecosystem': 'lucasamonrc',
    'trinsic:schema': 'https://schema.trinsic.cloud/lucasamonrc/demo-account'
  },
};


class AuthService {
  private userManager: UserManager;
  private settings: OidcClientSettings;

  constructor(settings: OidcClientSettings) {
    this.settings = settings;
    this.userManager = new UserManager(settings);
    Log.setLogger(console);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
      return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async signinRedirect() {
    const user = await this.userManager.signinRedirectCallback();
    console.log("Logged in user", user);
  }
}

const auth = new AuthService(settings);

export default auth;
