<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-10 16:09:33
 * @FilePath: \vue\src\views\admin\GeneralSituationView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div style="display: flex;flex-direction: column;align-items: center;">
            <p style="font-size: xx-large;font-weight: bolder;">概况</p>
        </div>
        <div style="margin-top: 15px;">
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content">
                        <div>
                            <el-card shadow="hover">
                                <h3>本月新增用户数</h3>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="regularuserNumber" title="普通用户">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="salesperson" title="销售员">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="appraiser" title="鉴定师">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="admin" title="管理员">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>

                        </div>
                        <div style="margin-top: 15px;">
                            <el-card shadow="hover">
                                <h3>本月销售额</h3>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="regularuserNumber" title="普通用户">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="salesperson" title="销售员">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="appraiser" title="鉴定师">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>
                                            <el-statistic group-separator="," :value="admin" title="管理员">
                                            </el-statistic>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>

                        </div>
                    </div>
                </el-col>
                <el-col :span="14">
                    <el-card shadow="hover">
                        <div>
                            <p style="font-size: x-large;margin-top: 0px;">平台进账流水</p>
                        </div>
                        <div class="grid-content">
                            <el-table :data="flowTableData" stripe style="width: 100%">
                                <el-table-column prop="id" label="id">
                                </el-table-column>
                                <el-table-column prop="outTradeNo" label="订单号">
                                </el-table-column>
                                <el-table-column prop="subject" label="交易名称">
                                </el-table-column>
                                <el-table-column prop="userId" label="用户id">
                                </el-table-column>
                                <el-table-column prop="totalAmount" label="金额">
                                </el-table-column>
                                <el-table-column prop="source" label="来源">
                                </el-table-column>
                                <el-table-column prop="updateTime" label="时间">
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            like: true,
            regularuserNumber: 0,
            salesperson: 0,
            appraiser: 0,
            admin: 0,
            flowTableData: [],
            currentPage:0,
            pageSize:10,
            total:0
        };
    },
    methods:{
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
        },
        handleCurrentChange(){

        }
    },
    beforeMount() {
        //获取普通用户新增总人数
        this.$request.get('user/adminGetUserNumberByType?type=0').then(res => {
            this.regularuserNumber = res.data;
        })
        this.$request.get('user/adminGetUserNumberByType?type=1').then(res => {
            this.salesperson = res.data;
        })
        this.$request.get('user/adminGetUserNumberByType?type=2').then(res => {
            this.appraiser = res.data;
        })
        this.$request.get('user/adminGetUserNumberByType?type=3').then(res => {
            this.admin = res.data;
        })


        //获取平台进账流水
        this.$request.get('platformRevenueFlowForm/getPageByFrom?type=&from=&page='+this.currentPage+'&rows='+this.pageSize).then(res=>{
            if(res.code==200){
                this.flowTableData = res.data.data;
                this.total = res.data.total;
            }
            else{
                this.$message.error(res.msg);
            }
        })
    },
};
</script>

<style lang="css">
.like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
}
</style>