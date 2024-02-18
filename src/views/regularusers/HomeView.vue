<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-30 16:32:01
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-07 15:16:50
 * @FilePath: \vue\src\views\regularusers\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-carousel trigger="click" height="350px">
      <el-carousel-item v-for="item in goodsList" :key="item.id" style="display: flex;justify-content: center;">
        <el-image :src="item.img" :fit="cover"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div style="display: flex; justify-content: center; font-size: xx-large">
      <p>热门推荐</p>
    </div>
    <div>
      <el-row>
        <el-col :span="3" v-for="item in goodsList" :key="item.id" :offset="1">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      count: 24,
      goodsList: [],
    };
  },
  methods: {
    toGoodsDetail(goodsId) {
      //console.log(goodsId)
      this.$router.push({
        path: "/index/goodsdetail",
        query: {
          goodsId: goodsId,
        },
      });
    },
  },
  beforeMount() {
    this.$request.get("goods/getRandomGoodsInfo").then((res) => {
      this.goodsList = res.data;
      //console.log(res)
    });
  },
};
</script>

<style lang="css" scoped>
.price {
  margin-bottom: 5px;
  margin-right: 5px;
  float: right;
}

.el-card {
  height: 300px;
  width: 200px;
  margin-top: 50px;
}

</style>