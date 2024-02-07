<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-09 21:43:38
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-02-07 11:36:55
 * @FilePath: \vue\src\views\LoginView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="background">
            <div style="width: 70vw;">

            </div>
            <div class="login">
                <div style="margin-top: 20vh;width: 25vw;">
                    <el-form :model="user" style="width: 100%" :rules="rules" ref="loginRef">
                        <div style="font-size: 30px; font-weight: bold; text-align: center; margin-bottom: 20px">欢迎登录
                        </div>
                        <el-form-item prop="name" label="用户名：">
                            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名"
                                v-model="user.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：">
                            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码"
                                v-model="user.password"></el-input>
                        </el-form-item>
                        <!--用户类型-->
                        <el-form-item prop="type" style="text-align: right;">
                            <el-select v-model="user.type" placeholder="请选择账户类型" size="mini" style="width: 130px;">
                                <el-option label="普通用户" value=0></el-option>
                                <el-option label="销售员" value=1></el-option>
                                <el-option label="鉴定师" value=2></el-option>
                                <el-option label="管理员" value=3></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%" @click="login">登 录</el-button>
                        </el-form-item>
                        <!--注册界面-->
                        <div style="display: flex">
                            <div style="flex: 1">还没有账号？请 
                                <span style="color: whitesmoke; cursor: pointer" @click="to_register()">注册</span>
                            </div>
                            <div style="flex: 1; text-align: right">
                                <span style="color: whitesmoke; cursor: pointer">忘记密码</span>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                type: '',
                name: '',
                password: ''
            },
            rules: {
                type: [
                    { required: true, message: '请选择账户类型', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs['loginRef'].validate((valid) => {
                if (valid) {
                    // 验证通过
                    this.$request.post('user/login', this.user).then(res => {
                        //console.log(res)
                        if (res.code === 200) {
                            sessionStorage.setItem("satoken", res.data.tokenValue)  // 存储token
                            sessionStorage.setItem("uid",res.data.loginId)
                            //this.$request.get("user/getUserInfo?id="+res.data.loginId).then(res=>{
                            //    sessionStorage.setItem("user",res.data)
                            //    this.user=res.data
                                //console.log(res)
                            //})
                            if(this.user.type==0){
                                this.$notify({
                                    title: '登录成功',
                                    message: '用户'+this.user.name+'欢迎回来',
                                    type: 'success',
                                    position: 'top-left'
                                });
                                this.$router.push('/index/home')
                            }
                            else if(this.user.type==1){
                                this.$notify({
                                    title: '登录成功',
                                    message: '销售员' +this.user.name+ '欢迎回来',
                                    type: 'success',
                                    position: 'top-left'
                                });
                            }
                            else if(this.user.type==2){
                                this.$notify({
                                    title: '登录成功',
                                    message: '鉴定师' +this.user.name+ '欢迎回来',
                                    type: 'success',
                                    position: 'top-left'
                                });
                            }
                            else if(this.user.type==3){
                                this.$notify({
                                    title: '登录成功',
                                    message: '管理员' +this.user.name+ '欢迎回来',
                                    type: 'success',
                                    position: 'top-left'
                                });
                            }
                            
                            
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        },
        to_register(){
            this.$router.push('/register')
        }
    },
    beforeMount(){
    }
}
</script>

<style lang="css" scoped>
.background{
    display: flex;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/loginView.jpg');
    background-size: cover;
    display: flex;
    ;width: 100vw;
    height: 100vh;
}
.login{
    display:flex;
    width: 30vw;
    justify-content:center;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.5);
}
</style>