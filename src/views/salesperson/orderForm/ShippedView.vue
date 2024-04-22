<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:17:32
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-15 18:52:21
 * @FilePath: \vue\src\views\regularusers\orderform\ShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">已发货订单</p>
        </div>
        <div style="margin-top: 15px;">
            <el-table :data="tableData" tooltip-effect="dark" style="width: 100;" :stripe=true :border=true>
                <el-table-column prop="id" label="订单号">
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

                <el-table-column prop="price" label="价格" sortable>
                    <template slot-scope="scope">
                        <p>¥ {{ scope.row.price }}</p>
                    </template>
                </el-table-column>

                <el-table-column prop="address" label="收货地址">
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间" sortable>
                </el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="SignById(scope.row.id)" style="margin-right: 5px;" type="primary">签收</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            trackingInfo: ""
        }
    },
    beforeMount() {
        this.$request.get('orderForm/getShippedById?id=' + sessionStorage.getItem('sid')).then(res => {
            console.log(res.data)
            this.tableData = res.data
        })
    },
    methods: {
        toGoodsDetail(gid) {
            this.$router.push({
                path: "/index/goodsdetail",
                query: {
                    goodsId: gid
                }
            })
        },
        SignById(id) {
            this.$request.post('orderForm/Sign', {
                "id": id,
                "uid": sessionStorage.getItem('sid'),
                "gid": "",
                "logisticsNumber": "",
                "state": "",
                "createTime": ""
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '签收成功',
                        type: 'success'
                    })
                    this.$router.go(0)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
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
    }
}
</script>

<style scoped></style>