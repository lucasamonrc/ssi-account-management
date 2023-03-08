import { OidcClient, OidcClientSettings } from 'oidc-client-ts';

import { appOptions, oidcOptions, trinsicOptions } from '@/config/env';

const config: OidcClientSettings = {
  authority: oidcOptions.authority,
  client_id: oidcOptions.clientId,
  response_type: oidcOptions.responseType,
  scope: oidcOptions.scope,
  redirect_uri: `${appOptions.baseUrl}/verify`,
  post_logout_redirect_uri: `${appOptions.baseUrl}/`,
  extraQueryParams: {
    "trinsic:ecosystem": trinsicOptions.ecosystem,
    "trinsic:schema": trinsicOptions.schema,
  },
};

const oidc = new OidcClient(config);

export default oidc;
