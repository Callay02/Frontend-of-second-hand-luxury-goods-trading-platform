<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:17:32
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 01:12:00
 * @FilePath: \vue\src\views\regularusers\orderform\ShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="margin-top: 15px;">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%;" :stripe=true :border=true>
            <el-table-column prop="id" label="订单号">
            </el-table-column>

            <el-table-column label="商品">
                <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image></template>
            </el-table-column>

            <el-table-column prop="info" label="详情">
            </el-table-column>

            <el-table-column label="成色">
                <template slot-scope="scope">
                    <p>{{ scope.row.fineness }} 新</p>
                </template>
            </el-table-column>

            <el-table-column prop="brandName" label="品牌">
            </el-table-column>

            <el-table-column prop="typeName" label="类型">
            </el-table-column>

            <el-table-column prop="rent" label="租金/天" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rent }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="deposit" label="押金" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.deposit }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="day" label="天数">
            </el-table-column>

            <el-table-column prop="rentTotal" label="总租金">
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rentTotal }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="updateTime" label="结算时间">
            </el-table-column>

            <el-table-column  prop="remark" label="备注">
                <template slot-scope="scope">
                    <p v-if="scope.row.remark== null" style="color:blue;">已退回</p>
                    <p v-if="scope.row.remark!= null" style="color: red;">{{ scope.row.remark }}</p>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <el-button size="mini" @click="toGoodsDetail(scope.row.gid)" style="margin-right: 5px;">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 1,
        }
    },
    beforeMount() {
        this.$request.get('rentalOrderForm/userGetOrderFormByState?state=4&page='+this.currentPage+'&rows='+this.pageSize ).then(res => {
            this.tableData = res.data.data;
            this.total = res.data.total;
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
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request
            .get(
                'rentalOrderForm/userGetOrderFormByState?state=4&page='+this.currentPage+'&rows='+this.pageSiz
            )
            .then((res) => {
                this.total = res.data.total;
                this.tableData = res.data.data;
            });
        },
    }
}
</script>

<style scoped></style>