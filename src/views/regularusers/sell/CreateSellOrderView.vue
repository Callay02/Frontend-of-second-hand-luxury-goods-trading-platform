<template>
  <div>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
        margin-bottom: 20px;
      "
    >
      <div>
        <el-dialog title="物流号" :visible.sync="dialogFormVisible">
          <div>
            <el-input
              v-model="purchaseOrderForm.logisticsNumber"
              placeholder="请输入物流号"
            ></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createOrderForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <div style="width: 20vw">
          <el-form
            :model="purchaseOrderForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="品牌" prop="brand">
              <el-select
                v-model="purchaseOrderForm.brand"
                placeholder="请选择品牌"
              >
                <el-option
                  v-for="item in brandList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="purchaseOrderForm.type"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in typeList"
                  :label="item.name"
                  :value="item.type"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详情" prop="info">
              <el-input v-model="purchaseOrderForm.info"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >创建</el-button
              >
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
      dialogFormVisible: false,
      brandList: [],
      typeList: [],
      purchaseOrderForm: {
        info: "",
        brand: "",
        type: "",
        uid: "",
        logisticsNumber: "",
      },
      rules: {
        info: [{ required: true, message: "请输入商品详情", trigger: "blur" }],
        brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(this.goodsForm)
          this.purchaseOrderForm.uid=sessionStorage.getItem('uid')
          this.dialogFormVisible = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.back();
    },
    createOrderForm() {
        console.log(this.purchaseOrderForm)
        this.$request.post('purchaseOrderForm/createOrderForm',this.purchaseOrderForm).then(res=>{
            if(res.code==200){
                this.$message({
                    type:"success",
                    message:res.msg
                })
                this.dialogFormVisible=false
            }else{
                this.$message({
                    type:"warning",
                    message:res.msg
                })
            }
        })
    },
  },
  beforeMount() {
    this.$request.get("goodsBrand/getGoodsBrand").then((res) => {
      this.brandList = res.data;
    });
    this.$request.get("goodsType/getGoodsType").then((res) => {
      this.typeList = res.data;
    });
  },
};
</script>

<style scoped></style>