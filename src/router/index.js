/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-09 14:53:49
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
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'

//----------------------------------------------------------------------------------------//
//普通用户
import IndexView from '../views/regularusers/IndexView.vue'
import HomeView from '../views/regularusers/HomeView.vue'
import GoodsTypeView from '../views/regularusers/GoodsTypeView.vue'
import GoodsDetailView from '../views/regularusers/GoodsDetailView.vue'
import ShoppingCartView from '../views/regularusers/ShoppingCartView.vue'
import MyInfoView from '../views/regularusers/MyInfoView.vue'
import OrderFormView from '../views/regularusers/orderform/OrderFormView.vue'
//查找商品
import RegularuserSearchGoodsView from '../views/regularusers/SearchGoodsView.vue'
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
//租赁页面
import RentalView from '../views/regularusers/RentalView.vue'
//租赁订单
import RentalOrderView from '../views/regularusers/rentalorderform/RentalOrderFormView.vue'
//租赁待发货订单
import RentalOrderFormToBeShippedView from '../views/regularusers/rentalorderform/ToBeShippedView.vue'
//租赁已发货订单
import RentalOrderFormShippedView from '../views/regularusers/rentalorderform/ShippedView.vue'
//租赁已签收订单
import RentalOrderFormSignedView from '../views/regularusers/rentalorderform/SignedView.vue'
//租赁退回订单
import RentalOrderFormReturnView from '../views/regularusers/rentalorderform/ReturnView.vue'
//租赁结算订单
import RentalOrderFormSettledView from '../views/regularusers/rentalorderform/SettledView.vue'

//----------------------------------------------------------------------------------------//
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
//租赁商品管理
import RentalGoodsManagementView from '@/views/admin/goodsManagement/RentalGoodsManagementView.vue'
//待发货订单
import ToBeShippedManagementView from '../views/admin/orderformManagement/ToBeShippedManagementView'
//已发货订单
import ShippedManagementView from '../views/admin/orderformManagement/ShippedManagementView'
//已签收订单
import SignedManagementView from '../views/admin/orderformManagement/SignedManagementView.vue'
//普通用户管理
import RegularUserManagementView from '../views/admin/userManagement/RegularUserManagementView.vue'
//销售员管理
import SalepersonManagementView from '@/views/admin/userManagement/SalepersonManagementView.vue'
//鉴定师管理
import AppraiserManagementView from '../views/admin/userManagement/AppraiserManagementView.vue'
//管理员管理
import AdminManagementView from '../views/admin/userManagement/AdminManagementView.vue'
//添加用户
import AddUserView from '../views/admin/userManagement/AddUserView.vue'
//收购订单管理
//待签收
import PurchaseToBeSignedManagementView from '../views/admin/purchaseOrderFormManagement/PurchaseToBeSignedManagementView.vue'
//待审核
import PurchaseToBeAuditedManagementView from '../views/admin/purchaseOrderFormManagement/PurchaseToBeAuditedManagementView.vue'
//待退货
import PurchaseToBeReturnedManagementView from '../views/admin/purchaseOrderFormManagement/PurchaseToBeReturnedManagementView.vue'
//待上架
import PendingOrderFormManagementView from '../views/admin/purchaseOrderFormManagement/PendingOrderFormManagementView.vue'
//已上架
import OnShelfOrderFormManagementView from '../views/admin/purchaseOrderFormManagement/OnShelfOrderFormManagementView.vue'
//已下架
//租赁订单管理
//待发货
import RentalOrderToBeShippedManagementView from '../views/admin/rentalOrderFormManagement/ToBeShippedManagementView.vue'
//已发货
import RentalOrderFormShippedManagementView from '../views/admin/rentalOrderFormManagement/ShippedManagementView.vue'
//已签收
import RentalOrderFormSignedManagementView from '../views/admin/rentalOrderFormManagement/SignedManagementView.vue'
//退回中
import RentalOrderFormReturnManagementView from '../views/admin/rentalOrderFormManagement/ReturnManagementView.vue'
//已结算
import RentalOrderFormSettledManagementView from '../views/admin/rentalOrderFormManagement/SettledManagementView.vue'

//----------------------------------------------------------------------------------------//
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

//----------------------------------------------------------------------------------------//
//销售员
import SalespersonView from '../views/salesperson/SalespersonView.vue'
//概况
import SalespersonGeneralSituationView from '../views/salesperson/GeneralSituationView.vue'
//商品搜索
import SearchGoodsView from '../views/salesperson/SearchGoodsView.vue'
//个人信息管理
import MySalespersonInfoView from '../views/salesperson/MySalespersonInfoView.vue'
//待发货
import SalespersonToBeShippedView from '../views/salesperson/orderForm/ToBeShippedView.vue'
//已发货
import SalespersonShippedView from '../views/salesperson/orderForm/ShippedView.vue'
//已签收订单
import SalespersonSignedView from '../views/salesperson/orderForm/SignedView.vue'
Vue.use(VueRouter)



const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page not found',
      isLogin: false
    },
    component: () => import('@/views/NotFoundView.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    name:'login',
    path:'/login',
    component:LoginView
  },
  {
    name:'logout',
    path:'/logout'
  },
  {
    name:'paySuccess',
    path:'/pay/success'
  },
  {
    name:'register',
    path:'/register',
    component:RegisterView
  },
  {
    name:'forgotPassword',
    path:'/forgotPassword',
    component:ForgotPasswordView
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
        path:'searchGoods',
        component:RegularuserSearchGoodsView
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
      },
      {
        path:'rental',
        component:RentalView
      },
      {
        path:'rentalOrderForm',
        component:RentalOrderView,
        children:[
          {
            path:'toBeShipped',
            component:RentalOrderFormToBeShippedView
          },
          {
            path:'shipped',
            component:RentalOrderFormShippedView
          },
          {
            path:'signed',
            component:RentalOrderFormSignedView
          },
          {
            path:'return',
            component:RentalOrderFormReturnView
          },
          {
            path:'settled',

            component:RentalOrderFormSettledView
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
      {
        path:'rentalGoodsManagement',
        component:RentalGoodsManagementView
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
        path:'salepersonManagement',
        component:SalepersonManagementView
      },
      {
        path:'appraiserManagement',
        component:AppraiserManagementView
      },
      {
        path:'adminManagement',
        component:AdminManagementView
        
      },
      {
        path:'salepersonDetails',
        component:()=>import('@/views/admin/userManagement/performanceDetails/SalepersonDetailsView.vue')
      },
      //收购订单管理
      {
        path:'purchaseToBeSignedManagement',
        component:PurchaseToBeSignedManagementView
      },
      {
        path:'purchaseToBeAuditedManagement',
        component:PurchaseToBeAuditedManagementView
      },
      {
        path:'purchaseToBeReturnedManagement',
        component:PurchaseToBeReturnedManagementView
      },
      {
        path:'PendingOrderFormManagement',
        component:PendingOrderFormManagementView
      },
      {
        path:'OnShelfOrderFormManagement',
        component:OnShelfOrderFormManagementView
      },
      //租赁订单管理
      {
        path:'rentalOrderFormToBeShippedManagement',
        component:RentalOrderToBeShippedManagementView
      },
      {
        path:'rentalOrderFormSignedManagement',
        component:RentalOrderFormShippedManagementView
      },
      {
        path:'rentalOrderFormShippedManagement',
        component:RentalOrderFormSignedManagementView
      },
      {
        path:'rentalOrderFormReturnManagement',
        component:RentalOrderFormReturnManagementView
      },
      {
        path:'rentalOrderFormSettledManagement',
        component:RentalOrderFormSettledManagementView
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
        path:'salespersonGeneralSituation',
        component:SalespersonGeneralSituationView
      },
      {
        path:'searchGoods',
        component:SearchGoodsView
      },
      {
        path:'mySalespersonInfo',
        component:MySalespersonInfoView
      },
      {
        path:'salespersonToBeShipped',
        component:SalespersonToBeShippedView
      },
      {
        path:'salespersonShipped',
        component:SalespersonShippedView
      },
      {
        path:'salespersonSigned',
        component:SalespersonSignedView
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
  }else if(to.path=='/forgotPassword'){
    if(isLogin!=null){
      next({path:'/'})
    }
  }else if(to.path=='/pay/success'){
    if(isLogin!=null){
      window.close();
    }
  }
  else if(isLogin == null){
    next({path:'/login'});
  }
  
  next();

})




export default router
