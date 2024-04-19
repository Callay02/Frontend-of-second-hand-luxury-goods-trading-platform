<template>
  <div>
    <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
        margin-bottom: 20px;
      ">
      <div>
        <!--填写物流信息-->
        <el-dialog title="填写物流号" :visible.sync="dialogFormVisible" append-to-body>
          <div style="display: flex;align-items: center;justify-content: center;">
            <p style="width: 70px;">物流公司:</p>
            <el-select v-model="purchaseOrderForm.courierCode" filterable placeholder="请选择">
              <el-option v-for="item, index in courierList" :key="index" :label="item.courier_name"
                :value="item.courier_code">
              </el-option>
            </el-select>
            <p style="width: 50px;margin-left: 15px;">物流号:</p>
            <el-input v-model="purchaseOrderForm.logisticsNumber" placeholder="请输入物流号" style="width: 500px;"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createOrderForm()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <div style="width: 20vw">
          <el-form :model="purchaseOrderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="品牌" prop="brand">
              <el-select v-model="purchaseOrderForm.brand" placeholder="请选择品牌">
                <el-option v-for="item in brandList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select v-model="purchaseOrderForm.type" placeholder="请选择类型">
                <el-option v-for="item in typeList" :label="item.name" :value="item.type" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详情" prop="info">
              <el-input v-model="purchaseOrderForm.info"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
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
        courierCode: "",
      },
      rules: {
        info: [{ required: true, message: "请输入商品详情", trigger: "blur" }],
        brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      courierList: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(this.goodsForm)
          this.purchaseOrderForm.uid = sessionStorage.getItem('uid')
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
      if (this.purchaseOrderForm.logisticsNumber != "" && this.purchaseOrderForm.courierCode != "") {
        this.$request.post('purchaseOrderForm/createOrderForm', this.purchaseOrderForm).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            })
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }
        })
      }else{
        this.$message.warning("请填写物流信息")
      }

    },
  },
  beforeMount() {
    //取出sessionStorage中的物流列表
    this.courierList = sessionStorage.getItem("courierList") ? JSON.parse(sessionStorage.getItem("courierList")) : []
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