<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-02-07 19:02:48
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-24 15:22:42
 * @FilePath: \vue\src\views\regularusers\MyInfoView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div style="display: flex;flex-direction: column;align-items: center;" size=500>
            <el-avatar> {{ this.userInfo.name }} </el-avatar>
            <p style="font-size: x-large;font-weight: bold;">余额:{{ this.userInfo.money }} ¥</p>
            <hr style="width: 30%;">
            <div style="display: flex;justify-content: center;margin-top: 5px">
                <p style="width: 100px;font-size: medium;font-weight: bold;">手机号:</p><el-input v-model="userInfo.phone"
                    placeholder="请输入手机号"></el-input>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 5px">
                <p style="width: 100px;font-size: medium;font-weight: bold;">邮箱:</p><el-input v-model="userInfo.email"
                    placeholder="请输入邮箱" disabled></el-input>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 5px">
                <p style="width: 100px;font-size: medium;font-weight: bold;">密码:</p><el-input type="password"
                    v-model="userInfo.password" placeholder="请输入密码" show-password></el-input>
            </div>
            <hr style="width:30%;margin-top: 5px">
            <p style="font-size: large;font-weight: bold;">实名信息</p>
            <div style="display: flex;justify-content: center;margin-top: 5px">
                <p style="width: 100px;font-size: medium;font-weight: bold;">身份证:</p><el-input v-model="userInfo.idCard"
                    disabled></el-input>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 5px">
                <p style="width: 100px;font-size: medium;font-weight: bold;">真实姓名:</p><el-input
                    v-model="userInfo.realName" disabled></el-input>
            </div>
            <hr style="width:30%;margin-top: 5px">
            <el-button type="primary" style="margin-top: 10px;" @click="submit">修改</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {},
        }
    },
    beforeMount() {
        this.$request.get('salespersonUser/getUserInfoById').then(res => {
            console.log(res)
            if (res.code == 200) {
                if (res.msg != "ok") {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
                this.userInfo = res.data
                if (res.data.money == null) {
                    this.userInfo.money = 0
                }
            }
        })
    },
    methods: {
        submit() {
            //更新销售员表中信息
            this.$request.post('salespersonUser/updateUserInfoById', {
                "phone": this.userInfo.phone,
            }).then(res => {
                if (res.code == 500) {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
            //更新user表中信息
            this.$request.post('user/updateMyUserInfoById', {
                "password": this.userInfo.password,
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.el-avatar {
    width: 150px;
    height: 150px;
    line-height: 150px
}

.el-avatar,
.el-cascader-panel,
.el-radio,
.el-radio--medium.is-bordered .el-radio__label,
.el-radio__label {
    font-size: 40px;
}
</style>