/*
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-12 18:40:54
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-01-31 01:21:10
 * @FilePath: \vue\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

const service = axios.create({
    baseURL:'/api/',
    timeout:30000
})

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


//request拦截器
service.interceptors.request.use(
    config=>{
        config.headers['Satoken']=sessionStorage.getItem("satoken");
        return config
    },
    error=>{
        console.error('request error:'+error)
        return Promise.reject(error)
    }
);

//respone拦截器
service.interceptors.response.use(
    response=>{
        let res = response.data;

        if(typeof res === 'string'){
            res = res?JSON.parse(res):res
        }
        return res;
    },
    error=>{
        console.error('respone error:'+error)
        return Promise.reject(error)
    }
)

export default service