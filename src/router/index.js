/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-09 00:35:22
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'


import IndexView from '../views/regularusers/IndexView.vue'
import HomeView from '../views/regularusers/HomeView.vue'
import GoodsTypeView from '../views/regularusers/GoodsTypeView.vue'
import GoodsDetailView from '../views/regularusers/GoodsDetailView.vue'
import ShoppingCartView from '../views/regularusers/ShoppingCartView.vue'
import MyInfoView from '../views/regularusers/MyInfoView.vue'
import OrderFormView from '../views/regularusers/OrderFormView.vue'

Vue.use(VueRouter)



const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    name:'login',
    path:'/login',
    component:LoginView
  },
  {
    name:'register',
    path:'/register',
    component:RegisterView
  },
  //普通用户
  {
    name:'index',
    path:'/index',
    component:IndexView,
    children: [
      {
        path: 'home',
        component: HomeView,
      },
      {
        path: 'goodsType',
        component: GoodsTypeView,
      },
      {
        path:'goodsDetail',
        component:GoodsDetailView,
      },
      {
        path:'shoppingCart',
        component:ShoppingCartView,
      },
      {
        path:'myInfo',
        component:MyInfoView
      },
      {
        path:'orderForm',
        component:OrderFormView
      }
    ],
  },
]


const router = new VueRouter({
  routes
})

const originaPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originaPush.call(this, location).catch(err => err)
}


//登录跳转
router.beforeEach((to,from,next)=>{
  let isLogin = sessionStorage.getItem("satoken");
  
  //if(isLogin==null){
   // next({path:'/login'});
  //}
  
  //登出
  if(to.path=='/logout'){
    //清空会话
    sessionStorage.clear();
    //跳转到登陆页面
    next({path:'/login'});
  }else if(to.path=='/login'){
    if(isLogin!=null){
      next({path:'/'})
    }
  }else if(to.path=='/register'){
    if(isLogin!=null){
      next({path:'/'})
    }
  }else if(isLogin == null){
    next({path:'/login'});
  }
  
  next();

})




export default router
