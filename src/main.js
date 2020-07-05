import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
// 引入ui
import ElementUI from "element-ui"
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';
// 注册组件库
Vue.use(ElementUI)

// 把axios绑定到vue的原型上
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 设置默认的api域名基准路径
axios.defaults.baseURL = "http://127.0.0.1:3000"

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
