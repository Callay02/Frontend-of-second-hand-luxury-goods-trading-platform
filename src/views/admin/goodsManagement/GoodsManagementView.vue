<template>
  <div>
    <div>
      <p style="font-size: x-large; font-weight: bolder">出售商品详情管理</p>
    </div>
    <div>
      <el-button size="medium" type="primary" style="" icon="el-icon-plus" @click="goToAddGoods">添加</el-button>
    </div>
    <div style="display: flex;width: 100%;margin-top: 15px;">
      <div style="display: flex; justify-content: center; align-items: center">
        <p style="width: 65px">品牌：</p>
        <el-select v-model="selectBrand" placeholder="请选择">
          <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        ">
        <p style="width: 65px">类型：</p>
        <el-select v-model="selectType" placeholder="请选择">
          <el-option v-for="item in type" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </div>
      <div style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        ">
        <p style="width: 65px">ID：</p>
        <el-input v-model="inputId" placeholder="请输入商品ID"></el-input>
      </div>
      <div style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        ">
        <p style="width: 65px">详情：</p>
        <el-input v-model="inputInfo" placeholder="请输入内容"></el-input>
      </div>
      <div style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        ">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </div>
    </div>

    <div style="display: flex; margin-top: 15px; justify-content: center">
      <div style="width: 100%">
        <el-table :data="goodsVoList" style="width: 100%" :border="true">
          <el-table-column label="id">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品">
            <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image></template>
          </el-table-column>

          <el-table-column label="详情">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.info }}</span>
            </template>
          </el-table-column>

          <el-table-column label="成色">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fineness }}</span>
            </template>
          </el-table-column>

          <el-table-column label="品牌">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brandName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="防伪码">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.antiCounterfeitingCode }}</span>
            </template>
          </el-table-column>

          <el-table-column label="添加时间">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1" style="margin-left: 10px;color: blue;">在售</span>
              <span v-if="scope.row.state == 0" style="margin-left: 10px;color: red;">已售</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="250px">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.state != 1" size="mini" @click="handleEdit(scope.$index, scope.row)" style="margin-right: 5px">编辑</el-button>

              <el-button :disabled="scope.row.state != 1" size="mini" style="margin-right: 5px" type="primary"
                @click="openDialog(scope.row.id)">转为租赁</el-button>


              <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                <el-button :disabled="scope.row.state != 1" size="mini" type="danger" slot="reference">删除</el-button>
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
    <el-dialog title="确定要转移为租赁商品？请输入租金/天" :visible.sync="dialogFormVisible">
      <div>
        <el-input v-model="rent" placeholder="请输入租金"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goodsToRentalGoods()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSearch: 0,
      brand: [],
      selectBrand: "未选择",
      type: [],
      selectType: "未选择",
      inputInfo: "",
      inputId: "",
      goodsVoList: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      dialogFormVisible: false,
      newBrandName: "",
      newBrandId: "",
      brandName: "",
      rent: "",
      selectedId: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      sessionStorage.setItem('gid', row.id)
      this.$router.push({
        path: "updateGoods",
        query: {
          type: "出售",
        },
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$request
        .post("goods/deleteGoodsById", {
          id: row.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.$router.go(0);
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.isSearch == 0) {
        this.$request
          .get(
            "goods/getGoodsPageByState?state=1&page=" +
            this.currentPage +
            "&rows=" +
            this.pageSize
          )
          .then((res) => {
            this.total = res.data.total;
            this.goodsVoList = res.data.goodsVoList;
          });
      } else if (this.isSearch == 1) {
        this.$request
          .post("goods/adminGetGoodsPageByBrandAndTypeAndInfo", {
            brand: this.selectBrand,
            type: this.selectType,
            id: this.inputId,
            info: this.inputInfo,
            page: this.currentPage,
            rows: this.pageSize,
          })
          .then((res) => {
            if (res.code == 200) {
              this.total = res.data.total;
              this.goodsVoList = res.data.goodsVoList;
            } else {
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }
          });
      }

    },
    goToAddGoods() {
      this.$router.push({
        path: "addGoods",
        query: {
          type: "出售",
        },
      });
    },
    clear() {
      this.selectBrand = "";
      this.selectType = "";
      this.inputInfo = "";
      this.inputId = "";
      this.isSearch = 0;
      this.$router.go(0);
    },
    search() {
      this.$request
        .post("goods/adminGetGoodsPageByBrandAndTypeAndInfo", {
          brand: this.selectBrand,
          type: this.selectType,
          info: this.inputInfo,
          id: this.inputId,
          page: this.currentPage,
          rows: this.pageSize,
        })
        .then((res) => {
          if (res.code == 200) {
            this.total = res.data.total;
            this.goodsVoList = res.data.goodsVoList;
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        });
      this.isSearch = 1;
    },
    openDialog(id) {
      this.selectedId = id;
      this.dialogFormVisible = true;
    },
    goodsToRentalGoods() {
      if (this.rent == "") {
        this.$message.warning("请输入租金");
      } else {
        this.$request.get("goods/goodsToRentalGoods?gid=" + this.selectedId + "&rent=" + this.rent).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.rent = "";
            this.selectedId = "";
            this.dialogFormVisible = false;
            this.$router.go(0);
          } else {
            this.$message.warning(res.msg);
          }
        })
      }
    }
  },
  beforeMount() {
    //获取商品品牌信息
    this.$request.get("goodsBrand/getGoodsBrand").then((res) => {
      if (res.code == 200) {
        this.brand = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    });
    //获取商品类型信息
    this.$request.get("/goodsType/getGoodsType").then((res) => {
      if (res.code == 200) {
        this.type = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    });
    if (this.isSearch == 0) {
      this.currentPage = 1;
      this.$request
        .get(
          "goods/getGoodsPageByState?state=1&page=" +
          this.currentPage +
          "&rows=" +
          this.pageSize
        )
        .then((res) => {
          this.total = res.data.total;
          this.goodsVoList = res.data.goodsVoList;
        });
    }

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