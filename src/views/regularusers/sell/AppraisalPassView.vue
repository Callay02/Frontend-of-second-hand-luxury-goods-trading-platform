<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-28 17:28:43
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-28 17:45:24
 * @FilePath: \vue\src\views\regularusers\sell\AppraisalSuccessView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">审核成功</p>
            </div>
            <div>
                <el-table :data="dataTable" border style="width: 100%">
                    <el-table-column prop="id" label="id" width="180">
                    </el-table-column>
                    <el-table-column label="商品" width="125">
                        <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img"
                                fit="cover">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image></template>
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情" width="180">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="180">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="180">
                    </el-table-column>
                    <el-table-column prop="acquisitionPrice" label="收购价格" width="180">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="审核时间" width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="toGoodsDetail(scope.row.gid)"
                                style="margin-right: 5px;" type="danger">取消</el-button>
                            <el-button size="mini" @click="SignById(scope.row.id)" style="margin-right: 5px;">出售</el-button>
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
            dataTable: [],
            currentPage: 1,
            pageSize: 5,
            total: 0,
        }
    },
    methods: {
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=3' + '&page=' + this.currentPage + '&rows=' + this.pageSize).then(res => {
                this.inTransitTable = res.data.purchaseOrderFormVoList
                this.inTransitTableTotal = res.data.total
            })
        },
    },
    beforeMount() {
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=3' + '&page=' + this.currentPage + '&rows=' + this.pageSize).then(res => {
            this.dataTable = res.data.purchaseOrderFormVoList
            this.total = res.data.total
        })
    }
}
</script>

<style scoped></style>