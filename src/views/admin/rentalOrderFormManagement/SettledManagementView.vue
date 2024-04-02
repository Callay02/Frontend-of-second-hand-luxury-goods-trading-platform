<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-02 15:32:59
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">已结算订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column label="订单号" prop="id">
                    </el-table-column>
                    <el-table-column label="物流号" prop="logisticsNumber">
                    </el-table-column>
                    <el-table-column label="商品id" prop="gid">
                    </el-table-column>
                    <el-table-column label="用户id" prop="uid">
                    </el-table-column>
                    <el-table-column label="名称" prop="name">
                    </el-table-column>
                    <el-table-column label="联系电话" prop="phone">
                    </el-table-column>
                    <el-table-column label="地址" prop="address">
                    </el-table-column>
                    <el-table-column label="退回时间" prop="endTime">
                    </el-table-column>
                    <el-table-column label="租赁天数" prop="day">
                    </el-table-column>
                    <el-table-column label="总租金" prop="rentTotal">
                    </el-table-column>

                    <el-table-column prop="remark" label="备注">
                        <template slot-scope="scope">
                            <p v-if="scope.row.remark == null" style="color:blue;">已退回</p>
                            <p v-if="scope.row.remark != null" style="color: red;">{{ scope.row.remark }}</p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {},
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 1,
        }
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "rentalOrderForm/getOrderFormPageByState?state=4&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                //console.log(res)
                this.total = res.data.total;
                this.tableData = res.data.data;
            });
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$request
                .get(
                    "rentalOrderForm/getOrderFormPageByState?state=4&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.data;
                });
        },
    }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>