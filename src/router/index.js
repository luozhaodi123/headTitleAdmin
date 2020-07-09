import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue"
import PostList from "@/views/PostList.vue"
import EditPost from "@/views/EditPost.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    meta: {
      breadcrumb: "首页"
    },
    children: [
      {
        path: "postlist",
        name: "postlistPage",
        component: PostList,
        meta: {
          breadcrumb: "文章列表"
        }
      },
      {
        path: "editpost",
        name: "editPostPage",
        component: EditPost,
        meta: {
          breadcrumb: "发布文章"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "loginPage",
    component: Login
  },

]

const router = new VueRouter({
  routes
})

export default router
