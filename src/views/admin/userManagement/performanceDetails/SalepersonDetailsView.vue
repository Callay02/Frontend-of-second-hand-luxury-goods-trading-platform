<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-04-08 13:26:00
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-08 17:56:23
 * @FilePath: \vue\src\views\admin\userManagement\performanceDetails\SalepersonDetailsView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <el-page-header @back="goBack" content="销售员结算"></el-page-header>
            <div>
                <p style="font-size: xx-large;">未结算</p>
            </div>
            <div>
                <p>已选择：{{ multipleSelection.length }} 个订单</p>
                <el-table ref="multipleTable" :data="tableData0" style="width: 100%;margin-top: 15px;" :border="true"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :selectable="checkSelectAble">
                    </el-table-column>
                    <el-table-column label="订单号" prop="id">
                    </el-table-column>
                    <el-table-column label="商品id" prop="gid">
                    </el-table-column>
                    <el-table-column label="用户id" prop="uid">
                    </el-table-column>
                    <el-table-column label="商品价格" prop="price">
                    </el-table-column>

                    <el-table-column label="提成">
                        <template slot-scope="scope">
                            <span >{{ scope.row.price*0.02 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange0" :current-page.sync="currentPage0"
                    :page-size="pageSize0" layout="total, prev, pager, next" :total="total0">
                </el-pagination>
            </div>

            <el-button size="medium" type="primary" @click="settle"
                style="float: right;margin-right: 10px;">结算</el-button>
        </div>
        <hr style="margin-top: 50px;margin-bottom: 50px;">
        <div>
            <div>
                <p style="font-size: xx-large;">已结算</p>
            </div>
            <div>
                <div>
                    <el-table :data="tableData1" style="width: 100%" border>
                        <el-table-column label="订单号" prop="id">
                        </el-table-column>
                        <el-table-column label="商品id" prop="gid">
                        </el-table-column>
                        <el-table-column label="用户id" prop="uid">
                        </el-table-column>
                        <el-table-column label="商品价格" prop="price">
                        </el-table-column>
                        <el-table-column label="提成">
                        <template slot-scope="scope">
                            <span >{{ scope.row.price*0.02 }}</span>
                        </template>
                    </el-table-column>
                        <el-table-column prop="createTime" label="创建时间">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination @current-change="handleCurrentChange1" :current-page.sync="currentPage1"
                        :page-size="pageSize1" layout="total, prev, pager, next" :total="total1">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            multipleSelection: [],
            tableData0: [],
            currentPage0: 1,
            pageSize0: 10,
            total0: 0,
            tableData1: [],
            currentPage1: 1,
            pageSize1: 10,
            total1: 0,
            totalPrice: 0
        }
    },
    methods: {
        settle() {
            if(this.multipleSelection.length>=5){
                for(var index in this.multipleSelection){
                this.$request.get("orderForm/settleSalespersonOrderFormByid?id="+this.multipleSelection[index].id).then(res=>{
                    if(res.code==200){
                        this.$message.success(res.msg);
                        this.$router.go(0)
                    }
                    else{
                        this.$message.error(res.msg);
                    }
                })
            }
            }
            else{
                this.$message.error("请至少选择5个订单进行结算");
            }
        },
        getTotalPrice() {
            var sum = 0
            this.multipleSelection.forEach(item => {
                sum += item.price
            })
            this.totalPrice = sum;
        },
        checkSelectAble() {
            return true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.getTotalPrice();
        },
        handleCurrentChange0() {
            this.$request
                .get(
                    "orderForm/adminGetSalespersonOrderFormPageByisSettleAndSidAndState?sid=" + this.$route.query.sid + "&state=2&isSettle=0&page=" + this.currentPage0 + "&rows=" + this.pageSize0)
                .then((res) => {
                    this.total0 = res.data.total;
                    this.tableData0 = res.data.orderFormVoList;
                });
        },
        handleCurrentChange1() {
            this.$request
                .get(
                    "orderForm/adminGetSalespersonOrderFormPageByisSettleAndSidAndState?sid=" + this.$route.query.sid + "&state=2&isSettle=1&page=" + this.currentPage0 + "&rows=" + this.pageSize0)
                .then((res) => {
                    this.total0 = res.data.total;
                    this.tableData0 = res.data.orderFormVoList;
                });
        },
        goBack() {
            this.$router.back()
        }
    },
    beforeMount() {
        //未结算
        this.currentPage = 1;
        this.$request
            .get(
                "orderForm/adminGetSalespersonOrderFormPageByisSettleAndSidAndState?sid=" + this.$route.query.sid + "&state=2&isSettle=0&page=" + this.currentPage0 + "&rows=" + this.pageSize0)
            .then((res) => {
                this.total0 = res.data.total;
                this.tableData0 = res.data.orderFormVoList;
            });
        //已结算
        this.currentPage = 1;
        this.$request
            .get(
                "orderForm/adminGetSalespersonOrderFormPageByisSettleAndSidAndState?sid=" + this.$route.query.sid + "&state=2&isSettle=1&page=" + this.currentPage0 + "&rows=" + this.pageSize0)
            .then((res) => {
                this.total1 = res.data.total;
                this.tableData1 = res.data.orderFormVoList;
            });
    }

}
</script>

<style lang="css" scoped></style>