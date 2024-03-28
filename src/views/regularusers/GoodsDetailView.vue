<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-06 17:35:50
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-28 11:06:05
 * @FilePath: \vue\src\views\regularusers\GoodsDetailView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </div>
        <div v-if="goodsType == '出售'" style="display: flex;flex-direction: column;align-items: center;">
            <el-image style="width: 20%; height: auto" :src="goods.img" fit="cover"></el-image>
            <p style="font-size: larger;font-weight: bold;">{{ goods.info }}</p>
            <p>成色: {{ goods.fineness }}新</p>
            <p>定价:¥ {{ goods.price }}</p>
            <p>上架时间: {{ goods.addTime }}</p>
            <el-button icon="el-icon-shopping-cart-2" plain @click="addToShoppingCart"
                v-if="goods.state == 1">加入购物车</el-button>
        </div>
        <div v-if="goodsType == '租赁'" style="display: flex;flex-direction: column;align-items: center;">
            <el-image style="width: 20%; height: auto" :src="goods.img" fit="cover"></el-image>
            <p style="font-size: larger;font-weight: bold;">{{ goods.info }}</p>
            <p>成色: {{ goods.fineness }}新</p>
            <p>租金:¥ {{ goods.rent }}/天</p>
            <p>押金:¥ {{ goods.deposit }}</p>
            <p>上架时间: {{ goods.addTime }}</p>
            <el-button icon="el-icon-shopping-cart-2" plain @click="rentGoods" v-if="goods.state == 1">租赁</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goods: "",
            goodsType: "",
        }
    },
    beforeMount() {
        //判断是出售还是租赁
        if (this.$route.query.gid != undefined) {
            this.goodsType = "出售"
        } else if (this.$route.query.rgid != undefined) {
            this.goodsType = "租赁"
        }

        if (this.goodsType == "出售") {
            this.$request.get('goods/getGoodsById?id=' + this.$route.query.gid).then(res => {
                this.goods = res.data
            })
        } else if (this.goodsType == "租赁") {
            this.$request.get('rentalGoods/getGoodsById?id=' + this.$route.query.rgid).then(res => {
                this.goods = res.data
            })
        }

    },
    methods: {
        goBack() {
            console.log('go back');
            this.$router.back()
        },
        addToShoppingCart() {
            this.$request.post('shoppingCart/addToShoppingCart', { "uid": sessionStorage.getItem("uid"), "gid": this.$route.query.gid }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        rentGoods() {
            this.$request.get("rentalOrderForm/createOrderFormByGid?gid=" + this.$route.query.rgid).then(res => {
                if (res.code == 200) {
                    this.$message({
                        showClose: true,
                        message: '租赁成功',
                        type:'success'
                    })
                    this.$router.go(0)
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>

<style lang="css" scoped></style>