<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <div>
            <p style="font-size: xx-large; font: bold">购物车</p>
          </div>
          <div style="margin-top: 15px">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :stripe="true"
              :border="true"
            >
              <el-table-column
                type="selection"
                width="55"
                :selectable="checkSelectAble"
              >
              </el-table-column>

              <el-table-column label="商品" width="125">
                <template slot-scope="scope"
                  ><el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.img"
                    fit="cover"
                  >
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image></template
                >
              </el-table-column>

              <el-table-column prop="info" label="详情" width="200">
              </el-table-column>

              <el-table-column label="成色" width="100">
                <template slot-scope="scope">
                  <p>{{ scope.row.fineness }} 新</p>
                </template>
              </el-table-column>

              <el-table-column prop="brandName" label="品牌" width="180">
              </el-table-column>

              <el-table-column prop="typeName" label="类型" width="100">
              </el-table-column>

              <el-table-column prop="price" label="价格" width="150" sortable>
                <template slot-scope="scope">
                  <p>¥ {{ scope.row.price }}</p>
                </template>
              </el-table-column>

              <el-table-column label="状态" width="50">
                <template slot-scope="scope">
                  <p v-if="scope.row.state == 1" style="color: blue">在售</p>
                  <p v-else-if="scope.row.state == 0" style="color: red">
                    已售
                  </p>
                </template>
              </el-table-column>

              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="toGoodsDetail(scope.row.id)"
                    style="margin-right: 5px"
                    >查看</el-button
                  >

                  <el-popconfirm
                    title="确定删除吗？"
                    @confirm="handleDelete(scope.$index, scope.row)"
                  >
                    <el-button size="mini" type="danger" slot="reference"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-aside style="width: 25%">
          <div style="margin-top: 100px">
            <p style="float: left; font-size: x-large">总计：¥&ensp;</p>
            <input
              type="text"
              v-model="totalPrice"
              style="
                border: 0px;
                outline: none;
                height: 80px;
                font-size: x-large;
              "
            />
          </div>
          <div style="margin-left: 15px">
            <li v-for="item in multipleSelection" :key="item.id">
              {{ item.info }}
            </li>
          </div>
          <div
            style="
              float: right;
              display: flex;
              justify-content: center;
              position: absolute;
              bottom: 30px;
              right: 30px;
            "
          >
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button type="primary" @click="createOrderForm"
              >确认购买</el-button
            >
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      totalPrice: 0,
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection)
      this.getTotalPrice();
    },
    handleDelete(index, row) {
      //console.log(index, row);
      this.$request
        .get(
          "shoppingCart/deleteShoppingCartById?uid=" +
            sessionStorage.getItem("uid") +
            "&gid=" +
            row.id
        )
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.$router.go(0);
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
        });
    },
    checkSelectAble(row) {
      return row.state == 1;
    },
    toGoodsDetail(id) {
      this.$router.push({
        path: "/index/goodsdetail",
        query: {
          goodsId: id,
        },
      });
    },
    getTotalPrice() {
      var sum = 0;
      this.multipleSelection.forEach((item) => {
        sum += item.price;
      });
      this.totalPrice = sum;
    },
    createOrderForm() {
      var list = [];
      for (var index in this.multipleSelection) {
        list.push({
          id: "",
          uid: sessionStorage.getItem("uid"),
          gid: this.multipleSelection[index].id,
          logisticsNumber: "",
          state: "",
          createTime: "",
        });
      }
      this.$request.post("orderForm/createOrderForm", list).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "购买成功",
            type: "success",
          });
          //从购物车中删除
          //for (var index in this.multipleSelection) {
          //    this.$request.get('shoppingCart/deleteShoppingCartById?uid=' + sessionStorage.getItem('uid') + '&gid=' + this.multipleSelection[index].id).then(res => {
          //        if (res.code != 200) {
          //            this.$message({
          //                message: res.msg,
          //                type: 'danger'
          //            });
          //        }
          //    })
          //}
          this.$router.go(0);
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },
  },
  beforeMount() {
    this.$request
      .get(
        "shoppingCart/getShoppingCartById?id=" + sessionStorage.getItem("uid")
      )
      .then((res) => {
        this.tableData = res.data;
        //for(var item in res.data){
        //    this.tableData.push(res.data[item])
        //    console.log(this.tableData)
        //}
      });
  },
};
</script>

<style scoped></style>