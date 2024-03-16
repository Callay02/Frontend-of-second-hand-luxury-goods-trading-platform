<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-01 15:25:18
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-18 23:08:11
 * @FilePath: \vue\src\views\regularusers\GoodsTypeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <el-row>
                <el-col :span="3" v-for="item in goodsList" :key="item.id" :offset=1>
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click.native="toGoodsDetail(item.id)">
                        <div style="display: flex;justify-content: center;margin-top: 10px;">
                            <el-image style="width: auto; height: 100px;" :src="item.img" fit="cover">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                        </div>
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
        </div>


        <div class="block">
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
            brands: [],
            type: "",
            currentPage: 1,
            pageSize: 18,
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
                //console.log(this.goods)
            })
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        toGoodsDetail(goodsId){
        console.log(goodsId)
        this.$router.push({
                    path: "/index/goodsdetail",
                    query: {
                        goodsId: goodsId
                    }
                })
    }
    },
    beforeMount() {
        this.type = this.$route.query.type
        this.currentPage = 1
        this.$request.get('goodsBrand/getGoodsBrand').then(res => {
            this.brands = res.data
        })
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
.block {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

.price {
    margin-bottom: 5px;
    margin-right: 5px;
    float: right;
}

.el-card {
    height: 300px;
    width: 200px;
    margin-top: 50px
}
</style>