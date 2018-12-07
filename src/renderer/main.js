import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// window.videojs = require("video.js")
// import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

// Vue.use(VueVideoPlayer, {
//   techOrder: ["flash", "html5"]
// })

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
