<template>
  <div style="margin-top:10%">
    <el-empty description="抱歉，你访问的页面不存在">
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