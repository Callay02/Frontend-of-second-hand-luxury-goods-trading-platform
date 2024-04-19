<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 00:13:28
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">已发货订单</p>
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

                    <!--显示物流信息-->
                    <el-table-column label="物流号" prop="logisticsNumber">
                        <template slot-scope="scope">
                            <el-popover placement="bottom" title="最新物流信息" width="200" trigger="click"
                                :content="trackingInfo">
                                <p slot="reference" @click="getTrackingInfo(scope.row.courierCode,scope.row.logisticsNumber)">{{ scope.row.courierCode }}:{{ scope.row.logisticsNumber }}</p>
                            </el-popover>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="商品id" prop="gid">
                    </el-table-column>
                    <el-table-column label="用户id" prop="uid">
                    </el-table-column>

                    <el-table-column label="用户名称" prop="name">
                    </el-table-column>
                    <el-table-column label="联系电话" prop="phone">
                    </el-table-column>
                    <el-table-column label="地址" prop="address">
                    </el-table-column>
                    <el-table-column label="发货时间" prop="deliveryTime">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="delivery(scope.$index, scope.row)"
                                style="margin-right: 5px">编辑</el-button>


                            <el-dialog title="修改物流号" :visible.sync="dialogFormVisible" append-to-body>
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
            trackingInfo:"",
            courierList:[]
        }
    },
    beforeMount() {
        //取出sessionStorage中的物流列表
        this.courierList=sessionStorage.getItem("courierList")?JSON.parse(sessionStorage.getItem("courierList")):[]
        this.currentPage = 1;
        this.$request
            .get(
                "orderForm/getOrderFormPageByState?state=1&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                console.log(res)
                this.total = res.data.total;
                this.tableData = res.data.orderFormVoList;
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
                    "orderForm/getOrderFormPageByState?state=1&page=" +
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
            //console.log(this.formData)
        },
        submitForm() {
            if (this.formData.logisticsNumber == null || this.formData.courierCode == null)
                this.$message({
                    type: 'warning',
                    message: "请输入物流号"
                })
            else {
                console.log(this.formData)
                this.$request.post('orderForm/updateShippedOrderFormById', this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.msg
                        })
                        this.dialogFormVisible = false
                    } else {
                        this.$message({
                            type: "warning",
                            message: res.msg
                        })
                    }
                })

            }

        },
        getTrackingInfo(courierCode, logisticsNumber){
            this.$request.get('51tracking/get?courierCode='+courierCode + '&trackingNumber='+logisticsNumber).then(res => {
                console.log(res)
                if(res.data.success.length != 0){
                    this.trackingInfo ="["+res.data.success[0].latest_checkpoint_time + "]" + res.data.success[0].latest_event
                }else{
                    this.trackingInfo ="暂无物流信息"
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