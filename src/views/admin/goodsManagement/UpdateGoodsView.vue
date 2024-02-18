<template>
    <div>
        <div>
            <el-page-header @back="goBack" content="编辑商品">
            </el-page-header>
        </div>


        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 100px;margin-bottom: 20px;">
            <div>
                <div>
                    <el-dialog title="上传照片" :visible.sync="dialogFormVisible">
                        <div style="align-items: center;display: flex;justify-content: center;">
                            <p>不更新照片，请不要上传</p>
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;">
                            <el-upload class="upload-demo" :action="objData.host" :before-upload="getPolicy" :data="objData"
                                :file-list="fileList" list-type="picture-card" :on-success="upLoadSuccess">
                                <el-button size="small" type="primary" v-if="upLoadCount == 0">点击上传</el-button>
                                
                            </el-upload>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: center;">
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updateGoods">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div style="width: 20vw;">
                    <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="品牌" prop="brand">
                            <el-select v-model="goodsForm.brand" placeholder="请选择品牌">
                                <el-option v-for="item in brandList" :label="item.name" :value="item.id"
                                    :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="goodsForm.type" placeholder="请选择类型">
                                <el-option v-for="item in typeList" :label="item.name" :value="item.type"
                                    :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详情" prop="info">
                            <el-input v-model="goodsForm.info"></el-input>
                        </el-form-item>
                        <el-form-item label="成色" prop="fineness">
                            <el-input v-model="goodsForm.fineness"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" prop="price">
                            <el-input v-model="goodsForm.price"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
        var validfineness = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入成色'));
        } else if (value<50 || value>100) {
          callback(new Error('请输入50-100间的数值'));
        } else {
          callback();
        }
      };
        return {
            dialogFormVisible: false,
            upLoadCount: 0,
            dir:"",
            fileList: [],
            brandList: [],
            typeList: [],
            objData: {
                OSSAccessKeyId: "",
                policy: "",
                signature: "",
                key: "",
                host: "",
                dir: "",
            },
            goodsForm: {
                info: "",
                brand: "",
                type: "",
                fineness: "",
                price: "",
                img: "",
                userId:""
            },
            rules: {
                info: [
                    { required: true, message: '请输入商品详情', trigger: 'blur' }
                ],
                brand: [
                    { required: true, message: '请选择品牌', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                fineness: [
                    { required: true,validator: validfineness, trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' }
                ]

            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //console.log(this.goodsForm)
                    this.dialogFormVisible=true
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goBack() {
            this.$router.back()
        },
        getPolicy() {
            let _self = this;
            return new Promise((resolve, reject) => {
                this.$request.get("oss/policy").then(res => {
                    //console.log(res);
                    _self.objData.OSSAccessKeyId = res.data.accessid;
                    _self.objData.policy = res.data.policy;
                    _self.objData.signature = res.data.signature;
                    _self.objData.dir = res.data.dir;
                    _self.objData.host = res.data.host;
                    
                    //console.log(_self.objData)
                    if (this.upLoadCount == 0) {
                        //console.log(this.goodsForm.brand + this.goodsForm.type)
                        _self.objData.key = res.data.dir + this.goodsForm.brand+"-"+this.goodsForm.type+"-"+this.goodsForm.info+"-"+sessionStorage.getItem('aid')+"${filename}";
                        this.dir=res.data.dir
                        resolve(true);//继续图片
                        this.upLoadCount += 1
                    } else {
                        reject(false)
                        this.$message({
                            type: "warning",
                            message: "请不要重复上传图片"
                        })
                    }
                })
                    .catch(function (error) {
                        console.log(error)
                        reject(false);//停止上传
                    });
            });

        },
        updateGoods(){
            
            this.goodsForm.userId=sessionStorage.getItem('aid')
            console.log(this.goodsForm)
            this.$request.post('goods/updateGoodsById',this.goodsForm).then(res=>{
                if(res.code==200){
                    this.$message({
                        type:"success",
                        message:res.msg
                    })
                    this.$router.back()
                }else{
                    this.$message({
                        type:"warning",
                        message:res.msg
                    })
                }
            })
            this.dialogFormVisible=false   
        },
        upLoadSuccess(response, file, fileList){
            //console.log(fileList)
            //console.log(file)
            this.goodsForm.img="https://callay-spdb.oss-cn-hangzhou.aliyuncs.com/"+this.dir + this.goodsForm.brand+"-"+this.goodsForm.type+"-"+this.goodsForm.info+"-"+sessionStorage.getItem('aid')+file.name
            //console.log(this.goodsForm.img)

        }
    },
    beforeMount() {
        if(sessionStorage.getItem('gid')==null)
            this.$router.push('goodsManagement')
        else{
            this.$request.get('goodsBrand/getGoodsBrand').then(res => {
                this.brandList = res.data
            })
            this.$request.get('goodsType/getGoodsType').then(res => {
                this.typeList = res.data
            })
            //console.log(sessionStorage.getItem('gid'))
            this.$request.get('goods/getGoodsByIdNoVo?id='+sessionStorage.getItem('gid')).then(res=>{         
                this.goodsForm=res.data
            })
            sessionStorage.removeItem('gid')
        } 
    }
}
</script>

<style scoped></style>