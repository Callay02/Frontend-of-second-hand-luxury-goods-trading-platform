<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-02 13:10:46
 * @FilePath: \vue\src\views\admin\GeneralSituationView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="display: flex;flex-direction: column;align-items: center;">
        <div>
            <p style="font-size: xx-large;font-weight: bolder;">概况</p>
        </div>
        <div style="width: 80%;">
            <el-card>
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
        <div style="width: 80%;margin-top: 15px;">
            <el-card>
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
        };
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