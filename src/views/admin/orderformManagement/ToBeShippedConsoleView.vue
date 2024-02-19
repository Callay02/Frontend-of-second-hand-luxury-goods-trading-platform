<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-19 23:09:12
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
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品名称:">
                                    <span>{{ props.row.info }}</span>
                                </el-form-item>
                                <el-form-item label="品牌:">
                                    <span>{{ props.row.typeName }}</span>
                                </el-form-item>
                                <el-form-item label="类型:">
                                    <span>{{ props.row.brandName }}</span>
                                </el-form-item>
                                <el-form-item label="用户名称:">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                                style="margin-right: 5px">发货</el-button>
                            <el-dialog title="修改" :visible.sync="dialogEditFormVisible">
                                <el-input v-model="brandName" placeholder="请输入品牌名"></el-input>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editBrand">确 定</el-button>
                                </div>
                            </el-dialog>
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
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$request
                .get(
                    "goods/getGoodsPageByState?state=1&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.goodsVoList = res.data.goodsVoList;
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