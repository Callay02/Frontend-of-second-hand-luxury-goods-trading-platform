<!--
 * @Author: Callay 2415993100@qq.com
 * @Date: 2024-01-13 17:28:16
 * @LastEditors: Callay 2415993100@qq.com
 * @LastEditTime: 2024-04-24 15:29:52
 * @FilePath: \vue\src\views\RegisterView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="background">
            <div style="width: 70vw;">

            </div>
            <div class="registerer">
                <div style="margin-top: 4vh;width: 25vw;">
                    <el-page-header @back="goBack" content="欢迎注册"></el-page-header>
                    <el-form :model="user" style="margin-top: 5px;width: 100%" :rules="rules" ref="registerRef">
                        <!--<div style="font-size: 30px; font-weight: bold; text-align: center; margin-bottom: 20px">欢迎注册</div>-->
                        <el-form-item prop="name" label="用户名：">
                            <el-input prefix-icon="el-icon-user" size="small" placeholder="请输入用户名"
                                v-model="user.name"></el-input>
                        </el-form-item>

                        <el-form-item prop="password" label="密码：" :required=true>
                            <el-input prefix-icon="el-icon-lock" size="small" show-password placeholder="请输入密码"
                                v-model="user.password"></el-input>
                        </el-form-item>

                        <el-form-item prop="checkPass" label="确认密码：" :required=true>
                            <el-input prefix-icon="el-icon-lock" size="small" show-password placeholder="请再次输入密码"
                                v-model="user.checkPass"></el-input>
                        </el-form-item>

                        <el-form-item prop="email" label="邮箱：">
                            <el-input prefix-icon="el-icon-message" size="small" placeholder="请输入邮箱"
                                v-model="user.email"></el-input>

                        </el-form-item>

                        <el-form-item style="text-align: right;">
                            <el-input style="width: 20%;margin-left: 1%;" size="small" placeholder="验证码"
                                v-model="verificationCode"></el-input>
                            <el-button size="small" style="width: 20%;margin-left: 1%;" @click="getCode">获取</el-button>
                        </el-form-item>

                        <el-form-item prop="idCard" label="居民身份证：">
                            <el-input prefix-icon="el-icon-postcard" size="small" placeholder="请输入身份证号"
                                v-model="user.idCard"></el-input>
                        </el-form-item>

                        <el-form-item prop="realName" label="真实姓名：">
                            <el-input prefix-icon="el-icon-postcard" size="small" placeholder="请输入真实姓名"
                                v-model="user.realName"></el-input>
                        </el-form-item>
                        <!--用户类型-->
                        <el-form-item prop="type" style="text-align: right;">
                            <el-select v-model="user.type" placeholder="请选择账户类型" size="small" style="width: 40%;">
                                <el-option label="普通用户" value=0></el-option>
                                <el-option label="代理商" value=1></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="text-align: center;">
                            <el-button style="width: 40%" @click="register">注 册</el-button>
                            <el-button style="width: 40%" @click="reset">重 置</el-button>
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
        //验证密码
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.user.checkPass !== '') {
                    this.$refs.registerRef.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            verificationCode: '',
            user: {
                type: '',
                name: '',
                password: '',
                checkPass: '',
                email: '',
                idCard: '',
                realName: ''
            },
            rules: {
                type: [
                    { required: true, message: '请选择账户类型', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱与验证码', trigger: 'blur' },
                ],
                idCard: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                ],
                realName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        register() {
            this.$refs['registerRef'].validate((valid) => {
                if (valid) {
                    this.user.verificationCode = this.verificationCode;
                    this.$request.post('user/register', this.user).then(res => {
                        if(res.code === 200){
                            this.$message.success(res.msg)
                            this.$router.push('/')
                        }
                        else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        },
        //获取验证码
        getCode() {
            if (this.user.email) {
                this.$request.get('user/getcode?email=' + this.user.email+'&type=register').then(res => {
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
            this.user.checkPass = ''
            this.user.email = ''
            this.user.idCard = ''
            this.user.name = ''
            this.user.password = ''
            this.user.realName = ''
            this.user.type = ''
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

.registerer {
    height: 100vh;
    display: flex;
    width: 30vw;
    justify-content: center;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.5);
}
.el-form-item {
    margin-bottom: 0px;
}
</style>