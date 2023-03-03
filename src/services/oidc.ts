import { OidcClient, OidcClientSettings} from 'oidc-client-ts';

const settings: OidcClientSettings = {
  authority: 'https://connect.trinsic.cloud',
  client_id: 'ssi-account-manager',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  post_logout_redirect_uri: 'http://localhost:3000/',
  response_type: 'code',
  scope: 'openid',
  extraQueryParams: {
    'trinsic:ecosystem': 'lucasamonrc',
    'trinsic:schema': 'https://schema.trinsic.cloud/lucasamonrc/demo-account'
  },
};

const oidc = new OidcClient(settings);

export default oidc;
