<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-06 16:06:54
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">待上架订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="id" label="id" width="100"> </el-table-column>
                    <el-table-column label="商品" width="125">
                        <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img"
                                fit="cover">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image></template>
                    </el-table-column>
                    <el-table-column prop="info" label="详情" width="200">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="200">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="200">
                    </el-table-column>
                    <el-table-column prop="fineness" label="成色" width="100">
                    </el-table-column>
                    <el-table-column prop="acquisitionPrice" label="收购价格" width="100">
                    </el-table-column>
                    <el-table-column prop="sellingPrice" label="出售价格" width="100">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="审核时间" width="200">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="changePrice(scope.$index, scope.row)"
                                style="margin-right: 5px">修改价格</el-button>
                            <el-dialog title="修改" :visible.sync="dialogFormVisible" append-to-body>
                                <el-input v-model="formData.sellingPrice" placeholder="请输入出售价格"></el-input>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="submitForm">确 定</el-button>
                                </div>
                            </el-dialog>
                            <el-button size="mini" @click="productListing(scope.$index, scope.row)" type="primary">上架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
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
                sellingPrice: [
                    { required: true, message: '请输入出售价格', trigger: 'blur' },
                ],
            }
        }
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "purchaseOrderForm/getPurchaseOrderFormPageByState?state=7&page=" +
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
                    "purchaseOrderForm/getPurchaseOrderFormPageByState?state=7&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.purchaseOrderFormVoList;
                });
        },
        changePrice(index, row) {
            this.dialogFormVisible = true
            this.formData = row
            //console.log(this.formData)
        },
        submitForm() {
            //console.log(this.formData)
            if (this.formData.sellingPrice == null)
                this.$message({
                    type: 'warning',
                    message: "请输入出售价格"
                })
            else if(this.formData.sellingPrice<this.formData.acquisitionPrice){
                this.$message({
                    type:"warning",
                    message:"请高于收购价格("+this.formData.acquisitionPrice+"¥)"
                })
            }
            else {
                //console.log(this.formData.logisticsNumber)
                this.$request.post('purchaseOrderForm/updatePurchaseOrderFormById', this.formData).then(res => {
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
        productListing(index,row){
            this.$request.get('purchaseOrderForm/productListingById?id='+row.id).then(res=>{
                if(res.code==200){
                    this.$message({
                        type:"success",
                        message:res.msg
                    })
                    this.$router.go(0)
                }else{
                    this.$message({
                        type:"warning",
                        message:res.msg
                    })
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