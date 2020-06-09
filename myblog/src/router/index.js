import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import articleList from '@/components/articlelist'
import articleShow from '@/components/articleshow'
import postArticle from '@/components/postArticle'
import changeArticle from '@/components/changearticle'
import { getToken } from "@/utils/auth"


Vue.use(Router)

const router = new Router({
 routes: [
   {
     path: '/',
     name: 'login',
     component: login
   },
   {
     path: '/home',
     name: 'home',
     component: home,
     children: [
       {
        path: '/home',
        name: 'articleList',
        component: articleList
       },
       {
         path: '/articleshow',
         name: 'articleShow',
         component: articleShow
       },
       {
         path: '/postarticle',
         name: postArticle,
         component: postArticle
       },
       {
        path: '/changearticle',
        name: changeArticle,
        component: changeArticle
       }
     ]
     }
    ]
})

router.beforeEach((to, from, next) => {
  //检查用户是否登陆
  let isLogin = getToken();
  if (isLogin) {
    next();
  } else {
    if (to.fullPath == "/Index") { //进行第一个欢迎页面直接放行
      //这是欢迎页面，直接放行
      next();
    } else if (to.fullPath == "/login") { //登陆页面也直接放行
      //如果是登陆页面，并且用户没有登陆，则跳转到登陆页面
      next();
    } else if (to.fullPath === '/') {
      next();
    } else {
      //跳转到登陆页面
      next('/');
    }
  }
})

export default router
