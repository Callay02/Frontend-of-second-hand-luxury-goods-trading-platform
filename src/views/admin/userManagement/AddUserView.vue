<template>
    <div>
        <div>
            <el-page-header @back="goBack" content="添加用户">
            </el-page-header>
        </div>


        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 100px;margin-bottom: 20px;">
            <div>
                <div style="width: 20vw;">
                    <el-form :model="user" style="width: 100%" :rules="rules" ref="registerRef">
                        <el-form-item prop="name" label="用户名：">
                            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名"
                                v-model="user.name"></el-input>
                        </el-form-item>

                        <el-form-item prop="password" label="密码：" :required=true>
                            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码"
                                v-model="user.password"></el-input>
                        </el-form-item>

                        <el-form-item prop="checkPass" label="确认密码：" :required=true>
                            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请再次输入密码"
                                v-model="user.checkPass"></el-input>
                        </el-form-item>

                        <el-form-item prop="email" label="邮箱：">
                            <el-input prefix-icon="el-icon-message" size="medium" placeholder="请输入邮箱"
                                v-model="user.email"></el-input>

                        </el-form-item>

                        <el-form-item prop="idCard" label="居民身份证：">
                            <el-input prefix-icon="el-icon-postcard" size="medium" placeholder="请输入身份证号"
                                v-model="user.idCard"></el-input>
                        </el-form-item>

                        <el-form-item prop="realName" label="真实姓名：">
                            <el-input prefix-icon="el-icon-postcard" size="medium" placeholder="请输入真实姓名"
                                v-model="user.realName"></el-input>
                        </el-form-item>

                        <el-form-item style="text-align: center;">
                            <el-button type="primary" style="width: 40%" @click="register">注 册</el-button>
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
                        this.$request.post('user/adminRegister', this.user).then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$message({
                                    type:"success",
                                    message:"添加成功"
                                })
                                this.reset()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                }
            })
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
            this.$router.back()
        }
    },
    beforeMount(){
        this.user.type=this.$route.query.type
    }
}
</script>

<style scoped></style>