<template>
    <div>
        <div>
            <p style="font-size: x-large;font-weight: bolder;">类型管理</p>
        </div>
        <div>
            <el-button type="primary" style="" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
            <el-dialog title="添加类型" :visible.sync="dialogFormVisible">
                <div style="display: flex;justify-content: center;">
                    <el-input v-model="newTypeId" placeholder="请输入id" style="width: 40%;margin-right: 10px;"></el-input>
                    <el-input v-model="newTypeName" placeholder="请输入类型名" style="width: 40%;margin-left: 10px;"></el-input>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addType">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div style="display: flex;margin-top: 15px;justify-content: center;">
            <div style="width: 100%;">
                <el-table :data="goodsTypeList" style="width: 100%" border>
                    <el-table-column label="id" width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.type }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="类型名" width="900">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                                style="margin-right: 5px;">编辑</el-button>
                            <el-dialog title="修改" :visible.sync="dialogEditFormVisible">
                                <el-input v-model="typeName" placeholder="请输入类型名"></el-input>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="editBrand">确 定</el-button>
                                </div>
                            </el-dialog>

                            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                                <el-button size="mini" type="danger" slot="reference">删除</el-button>
                            </el-popconfirm>
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
            goodsTypeList: [],
            currentPage: 1,
            pageSize: 10,
            total: 1,
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            newTypeName: "",
            newTypeId: "",
            typeName: ""
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogEditFormVisible = true
            sessionStorage.setItem("type", row.type)
            this.typeName = row.name
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$request.get('goodsType/deleteTypeById?type=' + row.type).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.msg,
                    })
                    this.$router.go(0)
                } else {
                    this.$message({
                        type: "warning",
                        message: res.msg
                    })
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$request.get('goodsType/getGoodsTypePage?page=' + this.currentPage + "&rows=" + this.pageSize).then(res => {
                this.total = res.data.total
                this.goodsTypeList = res.data.goodsTypeList
            })
        },
        addType() {
            this.dialogFormVisible = false
            console.log(this.newTypeName)
            this.$request.post('goodsType/addGoodsType', {
                "type": this.newTypeId,
                "name": this.newTypeName
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                    this.$router.go(0)
                } else {
                    this.$message({
                        type: "warning",
                        message: res.msg
                    })
                }
            })
        },
        editBrand() {
            this.$request.post('goodsType/updateTypeName', {
                "type": sessionStorage.getItem("type"),
                "name": this.typeName
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                    sessionStorage.removeItem('type')
                    this.$router.go(0)
                } else {
                    this.$message({
                        type: "warning",
                        message: res.msg
                    })
                }
            })
        }
    },
    beforeMount() {
        this.currentPage = 1
        this.$request.get('goodsType/getGoodsTypePage?page=' + this.currentPage + "&rows=" + this.pageSize).then(res => {
            this.total = res.data.total
            this.goodsTypeList = res.data.goodsTypeList
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