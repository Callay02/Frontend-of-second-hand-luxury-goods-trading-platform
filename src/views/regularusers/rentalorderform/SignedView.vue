<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:17:32
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-27 14:10:08
 * @FilePath: \vue\src\views\regularusers\orderform\ShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="margin-top: 15px;">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%;" :stripe=true :border=true>
            <el-table-column prop="id" label="订单号">
            </el-table-column>

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

            <el-table-column label="成色">
                <template slot-scope="scope">
                    <p>{{ scope.row.fineness }} 新</p>
                </template>
            </el-table-column>

            <el-table-column prop="brandName" label="品牌">
            </el-table-column>

            <el-table-column prop="typeName" label="类型">
            </el-table-column>

            <el-table-column prop="rent" label="租金/天" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rent }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="deposit" label="押金" sortable>
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.deposit }}</p>
                </template>
            </el-table-column>

            <el-table-column prop="beginTime" label="签收时间">
            </el-table-column>

            <el-table-column prop="day" label="天数">
            </el-table-column>

            <el-table-column prop="rentTotal" label="总租金">
                <template slot-scope="scope">
                    <p>¥ {{ scope.row.rentTotal }}</p>
                </template>
            </el-table-column>

            <el-table-column label="状态">
                <template slot-scope="scope">
                    <p v-if="scope.row.rentTotal < scope.row.deposit" style="color: blue;">租赁中</p>
                    <p v-if="scope.row.rentTotal >= scope.row.deposit" style="color: red;">已超时</p>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250px" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="toGoodsDetail(scope.row.gid)"
                        style="margin-right: 5px;">查看</el-button>

                    <el-popconfirm title="确定要购买吗？保证金将返还至您的钱包" @confirm="wantBuy(scope.row.id)">
                        <el-button v-if="scope.row.rentTotal < scope.row.deposit" size="mini" type="primary"
                            slot="reference" style="margin-right: 5px;">我要购买</el-button>
                    </el-popconfirm>


                    <el-button v-if="scope.row.rentTotal < scope.row.deposit" type="danger" size="mini"
                        style="margin-right: 5px;" @click="returning(scope.row)">退回</el-button>

                    <el-popconfirm title="超时商品无法退回" @confirm="overdueSettlement(scope.row)">
                        <el-button v-if="scope.row.rentTotal >= scope.row.deposit" type="danger" size="mini"
                            style="margin-right: 5px;" slot="reference">结算</el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!--填写物流信息-->
        <el-dialog title="填写物流号" :visible.sync="dialogFormVisible" append-to-body>
            <div style="display: flex;align-items: center;justify-content: center;">
                <p style="width: 70px;">物流公司:</p>
                <el-select v-model="selectOrderForm.courierCode" filterable placeholder="请选择">
                    <el-option v-for="item, index in courierList" :key="index" :label="item.courier_name"
                        :value="item.courier_code">
                    </el-option>
                </el-select>
                <p style="width: 50px;margin-left: 15px;">物流号:</p>
                <el-input v-model="selectOrderForm.logisticsNumber" placeholder="请输入物流号"
                    style="width: 500px;"></el-input>
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
            tableData: [],
            dialogFormVisible: false,
            selectOrderForm: {},
            courierList: []
        }
    },
    beforeMount() {
        //取出sessionStorage中的物流列表
        this.courierList = sessionStorage.getItem("courierList") ? JSON.parse(sessionStorage.getItem("courierList")) : []
        this.$request.get('rentalOrderForm/userGetOrderFormByState?state=2&page=0&rows=0').then(res => {
            this.tableData = res.data
        })
    },
    methods: {
        toGoodsDetail(gid) {
            this.$router.push({
                path: "/index/goodsdetail",
                query: {
                    rgid: gid
                }
            })
        },
        returning(orderForm) {
            this.dialogFormVisible = true
            orderForm.logisticsNumber = ""
            orderForm.courierCode = ""
            this.selectOrderForm = orderForm
        },
        submitForm() {
            if (this.selectOrderForm.logisticsNumber == "" || this.selectOrderForm.courierCode == "") {
                this.$message.warning("请填写物流号")
            } else {
                this.$request.post("rentalOrderForm/userReturn", this.selectOrderForm).then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.go(0)
                    }
                    else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        overdueSettlement(orderForm) {
            this.$request.get("rentalOrderForm/userOverdueSettlementById?id=" + orderForm.id).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.go(0)
                    //this.$router.go(0)
                }
                else {
                    this.$message.error(res.msg)
                }
            })
        },
        wantBuy(id) {
            this.$request.get("rentalOrderForm/userWantBuy?id=" + id).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.go(0)
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    }
}

</script>

<style scoped></style>