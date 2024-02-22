/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-22 09:57:45
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-16 13:17:21
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-15 13:39:25
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
import OrderFormView from '../views/regularusers/orderform/OrderFormView.vue'
//待发货
import ToBeShippedView from '../views/regularusers/orderform/ToBeShippedView.vue'
//已发货
import ShippedView from '../views/regularusers/orderform/ShippedView.vue'
//已签收
import SignedView from '../views/regularusers/orderform/SignedView.vue'

//管理员
import AdminView from '../views/admin/AdminView.vue'
//概况
import GeneralSituationView from '../views/admin/GeneralSituationView.vue'
//品牌管理
import BrandManagementView from '../views/admin/goodsManagement/BrandManagementView.vue'
//类型管理
import TypeManagementView from '../views/admin/goodsManagement/TypeMangementView.vue'
//商品管理
import GoodsManagementView from '../views/admin/goodsManagement/GoodsManagementView.vue'
//添加商品
import AddGoodsView from '../views/admin/goodsManagement/AddGoodsView.vue'
//更新商品
import UpdateGoodsView from '../views/admin/goodsManagement/UpdateGoodsView.vue'
//待发货订单
import ToBeShippedManagementView from '../views/admin/orderformManagement/ToBeShippedManagementView'
//已发货订单
import ShippedManagementView from '../views/admin/orderformManagement/ShippedManagementView'
//已签收订单
import SignedManagementView from '../views/admin/orderformManagement/SignedManagementView.vue'
//普通用户管理
import RegularUserManagementView from '../views/admin/userManagement/RegularUserManagementView.vue'
//添加用户
import AddUserView from '../views/admin/userManagement/AddUserView.vue'


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
        component:OrderFormView,
        children:[
          {
            path:'toBeShipped',
            component:ToBeShippedView
          },
          {
            path:'shipped',
            component:ShippedView
          },
          {
            path:'signed',
            component:SignedView
          }
        ]
      }
    ],
  },
  //管理员
  {
    name:'admin',
    path:'/admin',
    component:AdminView,
    children:[
      {
        path:'generalSituation',
        component:GeneralSituationView
      },
      //商品管理
      {
        path:'goodsManagement',
        component:GoodsManagementView
      },
      {
        path:'brandManagement',
        component:BrandManagementView
      },
      {
        path:'typeManagement',
        component:TypeManagementView
      },
      {
        path:'addGoods',
        component:AddGoodsView
      },
      {
        path:'updateGoods',
        component:UpdateGoodsView
      },
      //订单管理
      {
        path:'addUser',
        component:AddUserView
      },
      {
        path:'toBeShippedManagement',
        component:ToBeShippedManagementView
      },
      {
        path:'shippedManagement',
        component:ShippedManagementView
      },
      {
        path:'signedManagement',
        component:SignedManagementView
      },
      {
        path:'regularUserManagement',
        component:RegularUserManagementView
      }
    ]
  }
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
