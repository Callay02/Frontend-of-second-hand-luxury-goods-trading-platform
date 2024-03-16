<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-16 23:57:03
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-17 03:13:13
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
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div>
                            <el-statistic group-separator="," :precision="2" :value="value2" :title="title"></el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <el-statistic title="男女比">
                                <template slot="formatter">
                                    456/2
                                </template>
                            </el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="value1"
                                :title="title">
                                <template slot="prefix">
                                    <i class="el-icon-s-flag" style="color: red"></i>
                                </template>
                                <template slot="suffix">
                                    <i class="el-icon-s-flag" style="color: blue"></i>
                                </template>
                            </el-statistic>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <el-statistic :value="like ? 521 : 520" title="Feedback">
                                <template slot="suffix">
                                    <span @click="like = !like" class="like">
                                        <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                                        <i class="el-icon-star-off" v-show="!like"></i>
                                    </span>
                                </template>
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
            value1: 4154.564,
            value2: 1314,
            title: "增长人数",
        };
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