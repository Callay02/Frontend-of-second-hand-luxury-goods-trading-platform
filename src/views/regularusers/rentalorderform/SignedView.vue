<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:17:32
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-29 17:06:11
 * @FilePath: \vue\src\views\regularusers\orderform\ShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="margin-top: 15px;">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%;" :stripe=true :border=true>
            <el-table-column prop="id" label="订单号" width="200">
            </el-table-column>

            <el-table-column prop="logisticsNumber" label="物流号" width="200">
            </el-table-column>

            <el-table-column label="商品" width="125">
                <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image></template>
            </el-table-column>

            <el-table-column prop="info" label="详情" width="200">
            </el-table-column>

            <el-table-column label="成色" width="100">
                <template slot-scope="scope">
                    <p>{{ scope.row.fineness }} 新</p>
                </template>
            </el-table-column>

            <el-table-column prop="brandName" label="品牌" width="150">
            </el-table-column>

            <el-table-column prop="typeName" label="类型" width="100">
            </el-table-column>

            <el-table-column prop="rent" label="租金/天" width="150" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rent }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="deposit" label="押金" width="150" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.deposit }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="beginTime" label="签收时间" width="160">
            </el-table-column>

            <el-table-column prop="day" label="天数" width="50">
            </el-table-column>

            <el-table-column prop="rentTotal" label="总租金" width="100">
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rentTotal }}</p>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="toGoodsDetail(scope.row.gid)" style="margin-right: 5px;">查看</el-button>
                    <el-button type="primary" size="mini" style="margin-right: 5px;">退回并结算</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    beforeMount() {
        this.$request.get('rentalOrderForm/userGetOrderFormByState?state=2').then(res => {
            //console.log(res.data)
            this.tableData = res.data
        })
    },
    methods: {
        toGoodsDetail(gid) {
            this.$router.push({
                path: "/index/goodsdetail",
                query: {
                    rgid: gid
                }
            })
        },
    }
}
</script>

<style scoped></style>