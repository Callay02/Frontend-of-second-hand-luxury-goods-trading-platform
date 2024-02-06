<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-01 15:25:18
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-06 15:07:10
 * @FilePath: \vue\src\views\regularusers\GoodsTypeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-row>
            <el-col :span="3" v-for="item in goodsList" :key="item.id" :offset=1>
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.img" class="image">
                    <div style="padding: 14px;">
                        <div style="line-height: 5px;">
                            <p>{{ item.brandName }}</p>
                            <p>{{ item.typeName }}</p>
                        </div>
                        <div>
                            <p>{{ item.info }}</p>
                            <p>成色：{{ item.fineness }}新</p>
                            <!--<p class="price">现价：¥ {{item.price}}</p>-->
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="block">
            <span class="demonstration">显示总数</span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "",
            currentPage: 1,
            pageSize: 4,
            total: 1,
            goodsList: []
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$request.get('goods/getPageByType?type=' + this.$route.query.type + "&page=" + this.currentPage + "&rows=" + this.pageSize).then(res => {
                this.total = res.data.total
                this.goodsList = res.data.goodsVoList
                console.log(this.goods)
            })
        }
    },
    beforeMount() {
        this.type = this.$route.query.type
        this.currentPage = 1
        this.$request.get('goods/getPageByType?type=' + this.$route.query.type + "&page=" + this.currentPage + "&rows=" + this.pageSize).then(res => {
            this.total = res.data.total
            this.goodsList = res.data.goodsVoList
        })
    },
    watch: {
        // 监听路由是否变化
        '$route'(to, from) {
            //console.log('to', to, 'from', from);
            if (to.query.type != from.query.type) {
                //this.id = !to.query.id ? '' : to.query.id // 重新赋值，页面会发生变化
                // 需要重新请求接口时，可以在此处调用接口方法
                //this.$request.get('goods/getGoodsByType?type=' + this.$route.query.type).then(res => {
                //    this.goods = res.data
                //})
                this.type = this.$route.query.type
                this.currentPage = 1
                this.$request.get('goods/getPageByType?type=' + this.$route.query.type + "&page=" + this.currentPage + "&rows=" + this.pageSize).then(res => {
                    this.total = res.data.total
                    this.goodsList = res.data.goodsVoList
                })
            }
        }
    },
}
</script>

<style lang="css" scoped>
.price {
    margin-bottom: 5px;
    margin-right: 5px;
    float: right;
}

.image {
    width: 100%;
    height: 100px;
    display: block;

}

.el-card {
    height: 300px;
    width: 200px;
    margin-top: 50px
}
</style>