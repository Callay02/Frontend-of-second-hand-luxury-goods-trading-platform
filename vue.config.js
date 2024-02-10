/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:39:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-10 17:03:50
 * @FilePath: \vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
   proxy: {
     // /api 是请求的前缀
     '/api': {
       target: 'http://localhost:7000',
       //重写路径，把所有路径中包含/api的路径替换为空字符串
       pathRewrite: {'^/api':''}, 
      // 用于支持websocket
       ws: true,
       // 用于控制请求头中的host值
       changeOrigin: true
     },
   }
  }

})
