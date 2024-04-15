/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-17 18:30:09
 * @FilePath: \vue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './utils/request';
import axios from 'axios'
import echarts from "echarts";


Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$axios = axios
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
