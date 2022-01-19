import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GAuth from 'vue3-google-oauth2'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import VueCryptojs from 'vue-cryptojs/src/index'
import {getAuthToken} from '@/services/sessionProps'

const gauthOption = {
  clientId: '794246981306-m7rn1ev5b02nc7dl0r8bpurti8arc133.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const privates = publicPages.includes(to.path)
  const loggedIn = getAuthToken()

  if (authRequired && !loggedIn) {
    next('/')
  } else if (privates && loggedIn) {
    next('/main')
  } else {
    next()
  }

})
createApp(App).use(router).use(GAuth, gauthOption)
  .use(VueCryptojs).use(BootstrapVue3).mount('#app')
