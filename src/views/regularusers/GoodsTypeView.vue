<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-01 15:25:18
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-02 14:14:49
 * @FilePath: \vue\src\views\regularusers\GoodsTypeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        goodstype
    </div>
</template>

<script>
export default {
    beforeMount() {

    },
    watch: {
        // 监听路由是否变化
        '$route'(to, from) {
            //console.log('to', to, 'from', from);
            if (to.query.type != from.query.type) {
                //this.id = !to.query.id ? '' : to.query.id // 重新赋值，页面会发生变化
                // 需要重新请求接口时，可以在此处调用接口方法
                this.$request.get('goods/getGoodsByType?type=' + this.$route.query.type).then(res => {
                    console.log(res)
                })
            }
        }
    },
}
</script>

<style lang="css" scoped></style>