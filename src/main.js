import Vue from 'vue'
import App from './App.vue'
import anime from 'animejs'

Vue.config.productionTip = false
Vue.prototype.anime = anime

new Vue({
  render: h => h(App)
}).$mount('#app')
