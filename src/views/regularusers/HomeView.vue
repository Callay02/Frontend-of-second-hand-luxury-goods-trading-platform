<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-30 16:32:01
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-02 15:06:22
 * @FilePath: \vue\src\views\regularusers\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="block">
            <el-carousel trigger="click" height="350px">
                <el-carousel-item v-for="item in goodsList" :key="item.id" style="display: flex;justify-content:center;">
                    <!--<h3 class="small">{{ item }}</h3>-->
                    <img :src="item.img" style="object-fit:cover;width: auto;height: 100%;">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <el-row>
                <el-col :span="3" v-for="item in goodsList" :key="item.id" :offset=1>
                    <el-card :body-style="{ padding: '0px'}">
                        <img :src="item.img"
                            class="image">
                        <div style="padding: 14px;">
                            <div style="line-height: 5px;">
                                <p>{{ item.brandName }}</p>
                                <p>{{ item.typeName }}</p>
                            </div>
                            <div>
                                <p>{{ item.info }}</p>
                                <p>成色：{{ item.fineness }}新</p>
                                <!--<p class="price">现价：¥ {{item.price}}</p>-->
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
      count:24,
      goodsList:[]
    };
  },
  beforeMount(){
    this.$request.get("goods/getRandomGoodsInfo").then(res=>{
        this.goodsList=res.data
        //console.log(res)
    })
  }
}
</script>

<style lang="css" scoped>
  .price {
    margin-bottom: 5px;
    margin-right: 5px;
    float: right;
  }

  .image {
    width: 100%;
    height: 100px;
    display: block;
    
  }

  .el-card{
    height:300px;
    width:200px;
    margin-top:50px
  }
</style>