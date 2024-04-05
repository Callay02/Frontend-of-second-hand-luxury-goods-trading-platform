<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-13 17:28:16
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-05 17:48:57
 * @FilePath: \vue\src\views\RegisterView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="background">
            <div style="width: 70vw;">

            </div>
            <div class="forgot-password">
                <div style="margin-top: 4vh;width: 25vw;">
                    <el-page-header @back="goBack"></el-page-header>
                    <div style="font-size: 25px; text-align: center; margin-top: 15vh;font-family: sans-serif;">忘记密码</div>
                    <el-form :model="user" style="width: 100%" ref="forgotPassword" :rules="rules">
                        <el-form-item prop="name" label="用户名：">
                            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名"
                                v-model="user.name"></el-input>
                        </el-form-item>

                        <el-form-item prop="email" label="邮箱：">
                            <el-input prefix-icon="el-icon-message" size="medium" placeholder="请输入邮箱"
                                v-model="user.email"></el-input>
                        </el-form-item>

                        <el-form-item style="text-align: right;">
                            <el-input style="width: 18%;margin-left: 1%;" size="medium" placeholder="验证码"
                                v-model="user.verificationCode"></el-input>
                            <el-button size="medium" style="width: 15%;margin-left: 1%;" @click="getCode">获取</el-button>
                        </el-form-item>
                        
                        <el-form-item style="text-align: center;">
                            <el-button style="width: 40%" @click="reset()">重 置 密 码</el-button>
                        </el-form-item>
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
                password: '',
                checkPass: '',
                email: '',
                idCard: '',
                realName: '',
                verificationCode: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        //获取验证码
        getCode() {
            if (this.user.email) {
                this.$request.get('user/getcode?email=' + this.user.email+'&type=resetPassword').then(res => {
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.error(res.msg)
                    }

                })
            } else {
                this.$notify({
                    title: '警告',
                    message: '邮箱不能为空',
                    type: 'warning',
                    position: 'top-left'
                });
            }
        },
        reset() {
            this.$refs['forgotPassword'].validate((valid) => {
                if (valid) {
                    this.$request.post('user/userResetPassword', this.user).then(res => {
                        if (res.code === 200) {
                            this.$message.success(res.msg)
                            this.$router.push('/login') 
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        },
        goBack() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="css" scoped>
.background {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/loginView.jpg');
    background-size: cover;
    display: flex;
    ;
    width: 100vw;
    height: 100vh;
}

.forgot-password {
    display: flex;
    width: 30vw;
    justify-content: center;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.5);
}
</style>