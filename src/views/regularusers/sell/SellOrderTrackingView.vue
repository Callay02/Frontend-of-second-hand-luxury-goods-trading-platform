<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-23 11:19:42
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-20 01:41:08
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
                <el-table :data="inTransitTable" :border="true" style="width: 100%">
                    <el-table-column prop="id" label="id">
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
                    <el-table-column prop="info" label="商品详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发出时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @current-change="inTransitTableHandleCurrentChange"
                    :current-page.sync="inTransitTableCurrentPage" :page-size="inTransitTablePageSize"
                    layout="total, prev, pager, next" :total="inTransitTableTotal">
                </el-pagination>
            </div>
        </div>
        <!--审核中-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">审核中</p>
            </div>
            <div>
                <el-table :data="underReviewTable" :border="true" style="width: 100%">
                    <el-table-column prop="id" label="id">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="开始时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @current-change="underReviewTableHandleCurrentChange"
                    :current-page.sync="underReviewTableCurrentPage" :page-size="underReviewTablePageSize"
                    layout="total, prev, pager, next" :total="underReviewTableTotal">
                </el-pagination>
            </div>
        </div>
        <!--待退回-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">待退回</p>
            </div>
            <div>
                <el-table :data="toBeReturningTable" :border="true" style="width: 100%">
                    <el-table-column prop="id" label="id">
                    </el-table-column>
                    <el-table-column prop="info" label="商品详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发出时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @current-change="toBeReturningTableHandleCurrentChange"
                    :current-page.sync="toBeReturningTableCurrentPage" :page-size="toBeReturningTablePageSize"
                    layout="total, prev, pager, next" :total="toBeReturningTableTotal">
                </el-pagination>
            </div>
        </div>
        <!--退回中-->
        <div>
            <div>
                <p style="font-size: x-large;font-weight: bolder;">退回中</p>
            </div>
            <div>
                <el-table :data="returningTable" :border="true" style="width: 100%">
                    <el-table-column prop="id" label="id">
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
                    <el-table-column prop="info" label="商品详情">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发出时间">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="sign(scope.$index, scope.row)"
                                style="margin-right: 5px">签收</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @current-change="returningTableHandleCurrentChange"
                    :current-page.sync="returningTableCurrentPage" :page-size="returningTablePageSize"
                    layout="total, prev, pager, next" :total="returningTableTotal">
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
            //待退回中
            toBeReturningTable: [],
            toBeReturningTableCurrentPage: 1,
            toBeReturningTablePageSize: 5,
            toBeReturningTableTotal: 0,
            //退回中
            returningTable: [],
            returningTableCurrentPage: 1,
            returningTablePageSize: 5,
            returningTableTotal: 0,
            trackingInfo:""
        }
    },
    methods: {
        //运输中
        inTransitTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=0' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.inTransitTable = res.data.purchaseOrderFormVoList
                this.inTransitTableTotal = res.data.total
            })
        },
        //审核中
        underReviewTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=1' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.underReviewTable = res.data.purchaseOrderFormVoList
                this.underReviewTableTotal = res.data.total
            })
        },
        //待退回
        toBeReturningTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=4' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.toBeReturningTable = res.data.purchaseOrderFormVoList
                this.toBeReturningTableTotal = res.data.total
            })
        },
        //退回中
        returningTableHandleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=5' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
                this.returningTable = res.data.purchaseOrderFormVoList
                this.returningTableTotal = res.data.total
            })
        },
        //签收
        sign(index, row) {
            this.$request.get('purchaseOrderForm/updateStateSet6ById?id=' + row.id).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                    this.$router.go(0)
                }else{
                    this.$message({
                        type:"warning",
                        message:res.msg
                    })
                }
            })

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
        //待回中
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=4' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
            this.toBeReturningTable = res.data.purchaseOrderFormVoList
            this.toBeReturningTableTotal = res.data.total
        })
        //退回中
        this.$request.get('purchaseOrderForm/getPurchaseOrderFormPageByStateAndUid?state=5' + '&page=' + this.inTransitTableCurrentPage + '&rows=' + this.inTransitTablePageSize).then(res => {
            this.returningTable = res.data.purchaseOrderFormVoList
            this.returningTableTotal = res.data.total
        })
    }
}
</script>

<style scoped></style>