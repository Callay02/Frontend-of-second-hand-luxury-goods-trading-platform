<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-22 19:51:46
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-23 11:25:04
 * @FilePath: \vue\src\views\regularusers\sell\SellView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <el-button type="primary" @click="dialogFormVisible = true">我要出售</el-button>

            <el-dialog title="出售商品信息" :visible.sync="dialogFormVisible">
                <el-form :model="sellForm">
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            sellForm: {
                id:'',
                uid:'',
                logistics_number:'',
                info:'',
                type:'',
                brand:'',
                price:'',
                state:'',
                createTime:'',
                updateTime:'',
            },
            formLabelWidth: '120px'
        }
    }
}
</script>

<style scoped></style>