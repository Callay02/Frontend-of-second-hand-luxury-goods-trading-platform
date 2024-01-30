<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-30 16:32:01
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-01-30 22:30:44
 * @FilePath: \vue\src\views\regularusers\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="block">
            <el-carousel trigger="click" height="350px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <el-row>
                <el-col :span="3" v-for="id in count" :key="id" offset=1>
                    <el-card :body-style="{ padding: '0px'}">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image">
                        <div style="padding: 14px;">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                                <el-button type="text" class="button">操作按钮</el-button>
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
      goodsType:[]
    };
  },
  beforeMount(){

  }
}
</script>

<style lang="css" scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}


.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-card{
    height:300px;
    width:200px;
    margin-top:50px
  }
</style>