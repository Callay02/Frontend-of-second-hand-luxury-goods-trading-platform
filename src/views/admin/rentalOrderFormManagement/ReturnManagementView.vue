<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-29 15:48:10
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">退回订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column label="订单号" prop="id">
                    </el-table-column>
                    <!--显示物流信息-->
                    <el-table-column label="物流号" prop="logisticsNumber">
                        <template slot-scope="scope">
                            <el-popover placement="bottom" title="最新物流信息" width="200" trigger="click"
                                :content="trackingInfo">
                                <p slot="reference"
                                    @click="getTrackingInfo(scope.row.courierCode, scope.row.logisticsNumber)">{{
                                        scope.row.courierCode }}:{{ scope.row.logisticsNumber }}</p>
                            </el-popover>
                        </template>
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
                    <el-table-column label="操作" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="sign(scope.$index, scope.row)"
                                style="margin-right: 5px">签收并结算</el-button>
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
            trackingInfo: ""
        }
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "rentalOrderForm/getOrderFormPageByState?state=3&page=" +
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
                    "rentalOrderForm/getOrderFormPageByState?state=3&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.data;
                });
        },
        sign(index, row) {
            this.formData = row
            this.$request.get("rentalOrderForm/adminSignAndSettleById?id=" + row.id).then((res) => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.go(0)
                }
                else {
                    this.$message.error(res.msg)
                }
            })
        },
        getTrackingInfo(courierCode, logisticsNumber) {
            this.$request.get('51tracking/get?courierCode=' + courierCode + '&trackingNumber=' + logisticsNumber).then(res => {
                console.log(res)
                if (res.data.success.length != 0) {
                    this.trackingInfo = "[" + res.data.success[0].latest_checkpoint_time + "]" + res.data.success[0].latest_event
                } else {
                    this.trackingInfo = "暂无物流信息"
                }
            })
        }
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