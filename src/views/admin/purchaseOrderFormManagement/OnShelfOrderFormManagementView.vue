<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-18 23:35:39
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-16 17:31:17
 * @FilePath: \vue\src\views\admin\orderformManagement\ToBeShippedConsoleView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">已上架订单</p>
        </div>
        <div>
            <div>
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="id" label="id"> </el-table-column>
                    <el-table-column label="商品">
                        <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img"
                                fit="cover">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image></template>
                    </el-table-column>
                    <el-table-column prop="info" label="详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="fineness" label="成色">
                    </el-table-column>
                    <el-table-column prop="antiCounterfeitingCode" label="防伪码">
                    </el-table-column>
                    <el-table-column prop="acquisitionPrice" label="收购价格">
                    </el-table-column>
                    <el-table-column prop="sellingPrice" label="出售价格">
                    </el-table-column>
                    <el-table-column prop="apid" label="鉴定师id">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="上架时间">
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
        }
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "purchaseOrderForm/getPurchaseOrderFormPageByState?state=8&page=" +
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
                    "purchaseOrderForm/getPurchaseOrderFormPageByState?state=8&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    this.total = res.data.total;
                    this.tableData = res.data.purchaseOrderFormVoList;
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