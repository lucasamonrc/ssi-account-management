export const appOptions = {
  baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
}

export const trinsicOptions = {
  authToken: process.env.TRINSIC_AUTH_TOKEN ?? '',
  ecosystem: 'lucasamonrc',
  schema: 'https://schema.trinsic.cloud/lucasamonrc/memberaccount',
}

export const oidcOptions = {
  authority: 'https://connect.trinsic.cloud',
  clientId: 'ssi-account-manager',
  responseType: 'code',
  scope: 'openid',
}