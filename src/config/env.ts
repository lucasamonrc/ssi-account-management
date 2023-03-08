export const appOptions = {
  baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET ?? '',
  cookieName: 'ssi-account-management.token',
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
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