/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-08 09:55:10
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-02 10:55:59
 * @FilePath: \vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

//普通用户
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
//出售
import SellView from '../views/regularusers/sell/SellView.vue'
//创建出售订单
import CreateSellOrderView from '../views/regularusers/sell/CreateSellOrderView.vue'
//出售订单跟踪
import SellOrderTrackingView from '../views/regularusers/sell/SellOrderTrackingView.vue'
//出售订单已审核
import ReAppraisedView from '../views/regularusers/sell/AppraisedView.vue'
import ReSuccessView from '../views/regularusers/sell/SuccessView.vue'

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
//鉴定师管理
import AppraiserManagementView from '../views/admin/userManagement/AppraiserManagementView.vue'
//管理员管理
import AdminManagementView from '../views/admin/userManagement/AdminManagementView.vue'
//添加用户
import AddUserView from '../views/admin/userManagement/AddUserView.vue'
//收购订单管理
//待签收
import PurchaseToBeSignedManagementView from '../views/admin/purchaseOrderFormManagement/PurchaseToBeSignedManagementView.vue'
//待退货
import PurchaseToBeReturnedManagementView from '../views/admin/purchaseOrderFormManagement/PurchaseToBeReturnedManagementView.vue'
//待上架
import PendingOrderFormManagementView from '../views/admin/purchaseOrderFormManagement/PendingOrderFormManagementView.vue'

//鉴定师
import AppraiserView from '../views/appraiser/AppraiserView.vue'
//概况
import ApGeneralSituationView from '../views/appraiser/GeneralSituationView.vue'
//待鉴定
import ToBeAppraisedView from '../views/appraiser/ToBeAppraisedView.vue'
//已鉴定
import AppraisedView from '../views/appraiser/AppraisedView.vue'
//商品鉴定
import GoodsAppraisalView from '../views/appraiser/GoodsAppraisalView.vue'

//销售员
import SalespersonView from '../views/salesperson/SalespersonView.vue'
//商品搜索
import SearchGoodsView from '../views/salesperson/SearchGoodsView.vue'
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
      },
      {
        path:'sell',
        component:SellView,
        children:[
          {
            path:'createSellOrder',
            component:CreateSellOrderView
          },
          {
            path:'sellOrderTracking',
            component:SellOrderTrackingView
          },
          {
            path:'appraised',
            component:ReAppraisedView
          },
          {
            path:'reSuccess',
            component:ReSuccessView
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
      //用户管理
      {
        path:'regularUserManagement',
        component:RegularUserManagementView
      },
      {
        path:'appraiserManagement',
        component:AppraiserManagementView
      },
      {
        path:'adminManagement',
        component:AdminManagementView
        
      },
      //收购订单管理
      {
        path:'purchaseToBeSignedManagement',
        component:PurchaseToBeSignedManagementView
      },
      {
        path:'purchaseToBeReturnedManagement',
        component:PurchaseToBeReturnedManagementView
      },
      {
        path:'PendingOrderFormManagement',
        component:PendingOrderFormManagementView
      }
    ]
  },
  //鉴定师
  {
    name:'appraiser',
    path:'/appraiser',
    component:AppraiserView,
    children:[
      {
        path:'generalSituation',
        component:ApGeneralSituationView
      },
      {
        path:'toBeAppraised',
        component:ToBeAppraisedView
      },
      {
        path:'goodsAppraisal',
        component:GoodsAppraisalView
      },
      {
        path:'appraised',
        component:AppraisedView
      }
    ]
  },
  //销售员
  {
    name:'Salesperson',
    path:'/salesperson',
    component:SalespersonView,
    children:[
      {
        path:'searchGoods',
        component:SearchGoodsView
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
