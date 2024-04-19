<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 01:39:24
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">待退货订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" :border="true">
                    <el-table-column prop="id" label="id"> </el-table-column>
                    <el-table-column prop="uid" label="用户id">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="审核时间">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="delivery(scope.$index, scope.row)"
                                style="margin-right: 5px">退货</el-button>
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
        <!--填写物流信息-->
        <el-dialog title="填写物流号" :visible.sync="dialogFormVisible" append-to-body>
            <div style="display: flex;align-items: center;justify-content: center;">
                <p style="width: 70px;">物流公司:</p>
                <el-select v-model="formData.courierCode" filterable placeholder="请选择">
                    <el-option v-for="item, index in courierList" :key="index" :label="item.courier_name"
                        :value="item.courier_code">
                    </el-option>
                </el-select>
                <p style="width: 50px;margin-left: 15px;">物流号:</p>
                <el-input v-model="formData.logisticsNumber" placeholder="请输入物流号" style="width: 500px;"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
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
        //取出sessionStorage中的物流列表
        this.courierList=sessionStorage.getItem("courierList")?JSON.parse(sessionStorage.getItem("courierList")):[]
        this.currentPage = 1;
        this.$request
            .get(
                "purchaseOrderForm/getPurchaseOrderFormPageByState?state=4&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                this.total = res.data.total;
                this.tableData = res.data.purchaseOrderFormVoList;
            });
    },
    methods: {
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$request
                .get(
                    "purchaseOrderForm/getPurchaseOrderFormPageByState?state=4&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.purchaseOrderFormVoList;
                });
        },
        delivery(index, row) {
            this.dialogFormVisible = true
            this.formData = row
            //console.log(this.formData)
        },
        submitForm() {
            if (this.formData.logisticsNumber == "" || this.formData.logisticsNumber == "")
                this.$message({
                    type: 'warning',
                    message: "请填写物流信息"
                })
            else {
                //console.log(this.formData.logisticsNumber)
                this.$request.post('purchaseOrderForm/updateStateSet5ById', this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.msg
                        })
                        this.dialogFormVisible = false
                        this.$router.go(0)
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.msg
                        })
                    }
                })

            }

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