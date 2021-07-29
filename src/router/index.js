import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("views/home/Home.vue")
const Category = () => import("views/category/Category.vue")
const Cart = () => import("views/cart/Cart.vue")
const Profile = () => import("views/profile/Profile.vue")
const Detail = () => import("views/detail/Detail.vue")

// import Home from "views/home/Home.vue"

Vue.use(Router)



const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    // meta: {
    //   title: "首页"
    // }
  },
  {
    path: '/category',
    component: Category,
    // meta: {
    //   title: "分类"
    // }
  },
  {
    path: '/cart',
    component: Cart,
    // meta: {
    //   title: "购物车"
    // }
  },
  {
    path: '/profile',
    component: Profile,
    // meta: {
    //   title: "我的"
    // }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    // meta: {
    //   title: "详情页"
    // }
  },

]



const router = new Router({
  routes,
  mode: "history"
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   document.title = to.matched[0].meta.title

//   next()
// })

export default router
