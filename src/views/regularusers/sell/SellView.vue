<template>
    <div>
        <div>
            <el-button type="primary" @click="dialogFormVisible = true">我要出售</el-button>

            <el-dialog title="出售商品信息" :visible.sync="dialogFormVisible">
                <el-form :model="sellForm">
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
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