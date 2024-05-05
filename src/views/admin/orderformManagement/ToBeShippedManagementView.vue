<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-27 14:19:41
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">待发货订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" :border="true">
                    <el-table-column label="订单号" prop="id">
                    </el-table-column>

                    <el-table-column label="商品名称" prop="info">
                    </el-table-column>

                    <el-table-column label="品牌" prop="brandName">
                    </el-table-column>

                    <el-table-column label="类型" prop="typeName">
                    </el-table-column>

                    <el-table-column label="商品id" prop="gid">
                    </el-table-column>
                    <el-table-column label="用户id" prop="uid">
                    </el-table-column>
                    <el-table-column label="用户名" prop="name">
                    </el-table-column>
                    <el-table-column label="联系电话" prop="phone">
                    </el-table-column>
                    <el-table-column label="地址" prop="address">
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200px">
                        <template slot-scope="scope">


                            
                            <el-button size="mini" @click="delivery(scope.$index, scope.row)"
                                style="margin-right: 5px">发货</el-button>
                            <!--填写物流信息-->
                            <el-dialog title="填写物流号" :visible.sync="dialogFormVisible" append-to-body>
                                <div style="display: flex;align-items: center;justify-content: center;">
                                    <p style="width: 70px;">物流公司:</p>
                                    <el-select v-model="formData.courierCode" filterable placeholder="请选择">
                                        <el-option v-for="item, index in courierList" :key="index"
                                            :label="item.courier_name" :value="item.courier_code">
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


                            <el-popconfirm title="确定取消订单吗？"
                                @confirm="handleDelete(scope.$index, scope.row)">
                                <el-button size="mini" type="danger" slot="reference">取消订单</el-button>
                            </el-popconfirm>
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
            dialogFormVisible: false,
            rules: {
                logisticsNumber: [
                    { required: true, message: '请输入物流号', trigger: 'blur' },
                ],
            },
            courierList: [],
        }
    },
    beforeMount() {
        //取出sessionStorage中的物流列表
        this.courierList=sessionStorage.getItem("courierList")?JSON.parse(sessionStorage.getItem("courierList")):[]

        this.currentPage = 1;
        this.$request
            .get(
                "orderForm/getOrderFormPageByState?state=0&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                this.total = res.data.total;
                this.tableData = res.data.orderFormVoList;
            });
    },
    methods: {
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$request
                .get(
                    "orderForm/getOrderFormPageByState?state=0&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.orderFormVoList;
                });
        },
        delivery(index, row) {
            this.dialogFormVisible = true
            this.formData = row
        },
        submitForm() {
            if (this.formData.logisticsNumber == "" || this.courierCode == "")
                this.$message({
                    type: 'warning',
                    message: "请输入物流号"
                })
            else {
                console.log(this.formData)
                this.$request.post('orderForm/delivery', this.formData).then(res => {
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
        handleDelete(index, row) {
            console.log(index, row);
            this.$request.get('orderForm/cancelOrderById?id=' + row.id + "&uid=" + row.uid).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.$router.go(0)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
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