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

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
  console.log("进入了路由守卫");
  // 若访问的页面不是首页同时有没有token
  if (to.name !== "loginPage" && !localStorage.getItem("token")) {
    return router.replace("/login").catch(err => { })
  }
  next();
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
