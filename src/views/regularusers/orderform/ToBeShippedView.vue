<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:06:50
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-19 10:45:51
 * @FilePath: \vue\src\views\regularusers\orderform\ToBeShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-10 13:06:50
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-10 17:14:45
 * @FilePath: \vue\src\views\regularusers\orderform\ToBeShippedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="margin-top: 15px;">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%;" :stripe=true :border=true>
            <el-table-column prop="id" label="订单号" width="200">
            </el-table-column>

            <el-table-column label="商品" width="125">
                <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                    </el-image></template>
            </el-table-column>

            <el-table-column prop="info" label="详情" width="200">
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

            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="toGoodsDetail(scope.row.gid)" style="margin-right: 5px;">查看</el-button>

                    <el-popconfirm title="确定取消订单吗？消费金额会退回到您的余额" @confirm="handleDelete(scope.$index, scope.row)">
                        <el-button size="mini" type="danger" slot="reference">取消订单</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    beforeMount() {
        this.$request.get('orderForm/getToBeShippedById?id=' + sessionStorage.getItem('uid')).then(res => {
            console.log(res.data)
            this.tableData = res.data
        })
    },
    methods: {
        toGoodsDetail(gid) {
            this.$router.push({
                path: "/index/goodsdetail",
                query: {
                    gid: gid
                }
            })
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$request.get('orderForm/cancelOrderById?id='+row.id+"&uid="+sessionStorage.getItem('uid')).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.$router.go(0)
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
    }
}
</script>

<style scoped></style>