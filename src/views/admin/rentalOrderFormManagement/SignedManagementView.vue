<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 01:03:32
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">用户已签收订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" :border="true">
                    <el-table-column label="订单号" prop="id">
                    </el-table-column>
                    <el-table-column label="商品id" prop="gid">
                    </el-table-column>
                    <el-table-column label="用户id" prop="uid">
                    </el-table-column>
                    <el-table-column label="联系电话" prop="phone">
                    </el-table-column>
                    <el-table-column label="地址" prop="address">
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

                    <el-table-column prop="beginTime" label="签收时间">
                    </el-table-column>

                    <el-table-column prop="day" label="天数">
                    </el-table-column>

                    <el-table-column prop="rentTotal" label="总租金">
                        <template slot-scope="scope">
                            <p>¥ {{ scope.row.rentTotal }}</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <p v-if="scope.row.rentTotal < scope.row.deposit" style="color: blue;">租赁中</p>
                            <p v-if="scope.row.rentTotal >= scope.row.deposit" style="color: red;">已超时</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"></el-table-column>
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
            dialogFormVisible: false,
            rules: {
                logisticsNumber: [
                    { required: true, message: '请输入物流号', trigger: 'blur' },
                ],
            }
        }
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "rentalOrderForm/getOrderFormPageByState?state=2&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                console.log(res)
                this.total = res.data.total;
                this.tableData = res.data.data;
            });
    },
    methods: {
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.$request
                .get(
                    "rentalOrderForm/getOrderFormPageByState?state=2&page=" +
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