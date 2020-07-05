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
    children: [
      {
        path: "/postlist",
        name: "postlistPage",
        component: PostList
      },
      {
        path: "/editpost",
        name: "editPostPage",
        component: EditPost
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
