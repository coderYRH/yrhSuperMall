import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'common/toast'



Vue.config.productionTip = false
//使用自定义的消息框插件
Vue.use(toast)
//未加载图片是默认显示
const loadimage = require('assets/img/common/placeholder.png')
//使用lazyload插件
Vue.use(VueLazyLoad, {
  loading: loadimage,
})
//解决移动端的300毫秒延迟点击
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
