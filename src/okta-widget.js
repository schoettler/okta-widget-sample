import OktaSignIn from '@okta/okta-signin-widget'
import { config } from './config'

const widget = new OktaSignIn({
  baseUrl: config.OKTA_BASE_URL,
  // clientId: config.OKTA_CLIENT_ID,
  language: 'en',
  redirectUri: config.OKTA_REDIRECT_URI
})

export { widget }
