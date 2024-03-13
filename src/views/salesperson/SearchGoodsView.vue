<template>
  <div>
    <div>
      <p style="font-size: x-large; font-weight: bolder">商品搜索</p>
    </div>
    <div style="display: flex">
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
    <div style="margin-top: 15px">
      <div style="width: 100%">
        <el-table :data="goodsVoList" style="width: 100%" border>
          <el-table-column label="id" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品" width="125">
            <template slot-scope="scope"><el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image></template>
          </el-table-column>

          <el-table-column label="详情" width="400">
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

          <el-table-column label="价格" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="上架时间" width="250">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px; color: blue" v-if="scope.row.state == 1">在售</span>
              <span style="margin-left: 10px; color: red" v-else-if="scope.row.state == 0">已售</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="buy(scope.$index, scope.row)" style="margin-right: 5px"
                type="primary">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--购买弹窗-->
        <el-dialog title="购买" :visible.sync="dialogFormVisible">
          <el-input v-model="address" placeholder="请输入收货地址"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="pay">支付并购买</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
          layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brand: [],
      selectBrand: "未选择",
      type: [],
      selectType: "未选择",
      inputInfo: "",
      goodsVoList: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      isSearch: 0,
      dialogFormVisible: false,
      address: "",
      wantBuyGid: "",
    };
  },
  methods: {
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
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
          .post("goods/getGoodsPageByBrandAndTypeAndInfo", {
            brand: this.selectBrand,
            type: this.selectType,
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
    clear() {
      this.selectBrand = "";
      this.selectType = "";
      this.inputInfo = "";
      this.isSearch = 0;
      this.$router.go(0);
    },
    search() {
      this.$request
        .post("goods/getGoodsPageByBrandAndTypeAndInfo", {
          brand: this.selectBrand,
          type: this.selectType,
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
      this.isSearch = 1;
    },
    buy(index, row) {
      this.address = "";
      this.wantBuyGid = row.id
      this.dialogFormVisible = true;
    },
    pay() {
      //console.log(this.address)
      //console.log(this.wantBuyGid)
      this.$request.post('orderForm/createOrderFormBySid',{
        'gid':this.wantBuyGid,
        'address':this.address,
        'uid':sessionStorage.getItem('sid')
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg
          })
          this.dialogFormVisible = false
          this.$router.go(0)
        }
        else {
          this.$message({
            type: "warning",
            message: res.msg
          })
        }
      })
      
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
      //获取商品信息
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

<style scoped></style>