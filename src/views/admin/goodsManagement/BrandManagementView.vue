<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">品牌管理</p>
        </div>
        <div>
            <el-button type="primary" style="" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
            <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
                <el-input v-model="newBrandName" placeholder="请输入品牌名"></el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBrand">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div style="display: flex;margin-top: 15px;justify-content: center;">
            <div style="width: 95%;">
                <el-table :data="goodsBrandList" style="width: 100%" border>
                    <el-table-column label="id" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="品牌名" width="900">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            goodsBrandList: [],
            currentPage: 1,
            pageSize: 6,
            total: 1,
            dialogFormVisible:false,
            newBrandName:""
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$request.get('goodsBrand/getGoodsBrandPage?page=' + this.currentPage + "&rows=" + this.pageSize).then(res => {
                this.total = res.data.total
                this.goodsBrandList = res.data.goodsBrandList
            })
        },
        addBrand() {
            this.dialogFormVisible=false
            console.log(this.newBrandName)
            this.$request.post('goodsBrand/addBrand',{
                "id":"",
                "name":this.newBrandName
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type:"success",
                        message:"添加成功"
                    })
                }else{
                    this.$message({
                        type:"warning",
                        message:"添加失败"
                    })
                }
            })
        }
    },
    beforeMount() {
        this.currentPage = 1
        this.$request.get('goodsBrand/getGoodsBrandPage?page=' + this.currentPage + "&rows=" + this.pageSize).then(res => {
            this.total = res.data.total
            this.goodsBrandList = res.data.goodsBrandList
        })
    }
}
</script>

<style>
.block {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
</style>