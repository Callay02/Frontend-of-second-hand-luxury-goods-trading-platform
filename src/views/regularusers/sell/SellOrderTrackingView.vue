<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-23 11:19:42
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-28 17:34:46
 * @FilePath: \vue\src\views\regularusers\sell\LogisticsTrackingView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <!--运输中-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">运输中</p>
            </div>
            <div>
                <el-table :data="inTransitTable" border style="width: 100%">
                    <el-table-column prop="id" label="id" width="180">
                    </el-table-column>
                    <el-table-column prop="logisticsNumber" label="物流号" width="180">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情" width="180">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="180">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="180">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发出时间" width="180">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="inTransitTableHandleSizeChange"
                    @current-change="inTransitTableHandleCurrentChange" :current-page.sync="inTransitTableCurrentPage"
                    :page-size="inTransitTablePageSize" layout="total, prev, pager, next" :total="inTransitTableTotal">
                </el-pagination>
            </div>
        </div>
        <!--审核中-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">审核中</p>
            </div>
            <div>
                <el-table :data="underReviewTable" border style="width: 100%">
                    <el-table-column prop="id" label="id" width="180">
                    </el-table-column>
                    <el-table-column prop="logisticsNumber" label="物流号" width="180">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情" width="180">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="180">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="180">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="开始时间" width="180">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="underReviewTableHandleSizeChange"
                    @current-change="underReviewTableHandleCurrentChange" :current-page.sync="underReviewTableCurrentPage"
                    :page-size="underReviewTablePageSize" layout="total, prev, pager, next" :total="underReviewTableTotal">
                </el-pagination>
            </div>
        </div>
        <!--退回中-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">退回中</p>
            </div>
            <div>
                <el-table :data="returningTable" border style="width: 100%">
                    <el-table-column prop="id" label="id" width="180">
                    </el-table-column>
                    <el-table-column prop="logisticsNumber" label="物流号" width="180">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情" width="180">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="180">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="180">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发出时间" width="180">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="returningTableHandleSizeChange"
                    @current-change="returningTableHandleCurrentChange" :current-page.sync="returningTableCurrentPage"
                    :page-size="returningTablePageSize" layout="total, prev, pager, next" :total="returningTableTotal">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //运输中
            inTransitTable: [],
            inTransitTableCurrentPage: 1,
            inTransitTablePageSize: 5,
            inTransitTableTotal: 0,
            //审核中
            underReviewTable: [],
            underReviewTableCurrentPage: 1,
            underReviewTablePageSize: 5,
            underReviewTableTotal: 0,
            //退回中
            returningTable: [],
            returningTableCurrentPage: 1,
            returningTablePageSize: 5,
            returningTableTotal: 0,
        }
    },
    methods: {
        //运输中
        inTransitTableHandleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        inTransitTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=0' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.inTransitTable = res.data.purchaseOrderFormVoList
                this.inTransitTableTotal = res.data.total
            })
        },
        //审核中
        underReviewTableHandleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        underReviewTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=1' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.underReviewTable = res.data.purchaseOrderFormVoList
                this.underReviewTableTotal = res.data.total
            })
        },
        //退回中
        returningTableHandleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        returningTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=5' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.underReviewTable = res.data.purchaseOrderFormVoList
                this.underReviewTableTotal = res.data.total
            })
        },
    },
    beforeMount() {
        //运输中
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=0' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
            this.inTransitTable = res.data.purchaseOrderFormVoList
            this.inTransitTableTotal = res.data.total
        })
        //审核中
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=1' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
            this.underReviewTable = res.data.purchaseOrderFormVoList
            this.underReviewTableTotal = res.data.total
        })
        //退回中
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=5' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.underReviewTable = res.data.purchaseOrderFormVoList
                this.underReviewTableTotal = res.data.total
        })
    }
}
</script>

<style scoped></style>