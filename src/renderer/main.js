import 'bootstrap-honoka/dist/css/bootstrap.min.css'
import 'bootstrap-honoka/dist/js/bootstrap.min.js'

import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import { google } from 'googleapis'
import { installed as clientSecret } from '@/../client_secret.json'

const OAuth2 = google.auth.OAuth2

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const GOOGLE_REDIRECT_URI = 'http://localhost:14514/'
const mdGmail = {
  GOOGLE_REDIRECT_URI,
  googleAuth: new OAuth2(clientSecret.client_id,
    clientSecret.client_secret,
    GOOGLE_REDIRECT_URI)
}

Object.defineProperty(Vue.prototype, '$mdGmail', {
  get () {
    return mdGmail
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
