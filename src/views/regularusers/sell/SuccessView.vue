<template>
    <div>
        <div>
            <p style="font-size: x-large; font-weight: bolder">交易成功</p>
        </div>
        <div style="display: flex; margin-top: 15px; justify-content: center">
            <div style="width: 100%">
                <el-table :data="dataTable" style="width: 100%" border>
                    <el-table-column label="id" width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="商品" width="125">
                        <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img"
                                fit="cover">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image></template>
                    </el-table-column>

                    <el-table-column label="详情" width="300">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.info }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="成色" width="60">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.fineness }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="品牌" width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.brandName }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="类型" width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="收购价格" width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.acquisitionPrice }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="收购时间" width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataTable: [],
            currentPage: 1,
            pageSize: 10,
            total: 1,
        };
    },
    methods: {
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.$request
                .get(
                    "purchaseOrderForm/getPageByUidAndState?state=8&page=" +
                    this.currentPage +
                    "&rows=" +
                    this.pageSize
                )
                .then((res) => {
                    //console.log(res)
                    this.total = res.data.total;
                    this.dataTable = res.data.data;

                });
        },
    },
    beforeMount() {
        this.currentPage = 1;
        this.$request
            .get(
                "purchaseOrderForm/getPageByUidAndState?state=8&page=" +
                this.currentPage +
                "&rows=" +
                this.pageSize
            )
            .then((res) => {
                //console.log(res)
                this.total = res.data.total;
                this.dataTable = res.data.data;

            });
    },
};
</script>

<style>
.block {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
</style>