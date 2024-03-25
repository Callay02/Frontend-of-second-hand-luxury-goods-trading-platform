<template>
  <div>
    <div style="display: flex">
      <div style="display: flex; justify-content: center; align-items: center">
        <p style="width: 65px">品牌：</p>
        <el-select v-model="selectBrand" placeholder="请选择">
          <el-option
            v-for="item in brand"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <div
        style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        "
      >
        <p style="width: 65px">类型：</p>
        <el-select v-model="selectType" placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>
      <div
        style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        "
      >
        <p style="width: 65px">详情：</p>
        <el-input v-model="inputInfo" placeholder="请输入内容"></el-input>
      </div>
      <div
        style="
          display: flex;
          margin-left: 15px;
          justify-content: center;
          align-items: center;
        "
      >
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </div>
    </div>
    <div style="margin-top: 15px">
      <el-row>
        <el-col :span="3" v-for="item in goodsVoList" :key="item.id" :offset="1">
          <!--商品展示卡片-->
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click.native="toGoodsDetail(item.id)"
          >
            <div
              style="display: flex; justify-content: center; margin-top: 10px"
            >
              <el-image
                style="width: auto; height: 100px"
                :src="item.img"
                fit="cover"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </div>
            <div style="padding: 14px">
              <div style="line-height: 5px">
                <p>{{ item.brandName }}</p>
                <p>{{ item.typeName }}</p>
              </div>
              <div>
                <p>{{ item.info }}</p>
                <p>成色：{{ item.fineness }}新</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
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
      pageSize: 18,
      total: 1,
      isSearch: 0,
      dialogFormVisible: false,
      address: "",
      wantBuyGid: "",
    };
  },
  methods: {
    toGoodsDetail(goodsId){
        //console.log(goodsId)
        this.$router.push({
                    path: "/index/goodsdetail",
                    query: {
                        goodsId: goodsId
                    }
                })
    },
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
      this.wantBuyGid = row.id;
      this.dialogFormVisible = true;
    },
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

<style scoped>
.block {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

.price {
    margin-bottom: 5px;
    margin-right: 5px;
    float: right;
}

.el-card {
    height: 300px;
    width: 200px;
    margin-top: 50px
}
</style>