/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-01-26 13:55:36
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import IndexView from '../views/IndexView.vue'


Vue.use(VueRouter)



const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    name:'index',
    path:'/index',
    component:IndexView
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
  }
]


const router = new VueRouter({
  routes
})

//登录跳转
router.beforeEach((to,from,next)=>{
  let isLogin = sessionStorage.getItem("honey-user");
  
  //登出
  if(to.path=='/logout'){
    //清空会话
    sessionStorage.clear();
    //跳转到登陆页面
    next({path:'/login'});
  }else if(to.path=='/login'){
    if(isLogin!=null){
      next({path:'/index'})
    }
  }else if(to.path=='/register'){
    if(isLogin!=null){
      next({path:'/index'})
    }
  }else if(isLogin == null){
    next({path:'/login'});
  }
  
  next();

})

export default router
