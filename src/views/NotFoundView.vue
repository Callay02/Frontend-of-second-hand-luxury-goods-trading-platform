<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-03-17 18:01:31
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-03-26 17:41:51
 * @FilePath: \vue\src\views\NotFoundView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="margin-top:5%">
    <div style="display: flex; justify-content: center; align-items: center;">
      <p style="font-size: 60px; font-weight: bold;font-family: fantasy;">404 Not Found</p>
    </div>
    <el-empty description="非常抱歉，你访问的页面不存在">
      <el-button type="info" @click="back" round>返回上一页</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
</style>