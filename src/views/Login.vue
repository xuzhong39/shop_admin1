<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <div class="grid-content bg-purple"></div>
      <el-form
        :model="form"
        :rules="ruleForm"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>


<script>
// 要实现表单校验
// 1.先给数据中添加一个校验规则的对象ruleForm
// 2.ruleForm：{表单绑定的数据的名称:[{retuired:必填项,message:"提示信息",trigger:"触发校验的时机 blur  change"},{}]}
// 3.需要将这个校验规则对象绑定到el-form组件上，:rules = 'ruleForm'
// 4.需要给每个el-form-item组件添加一个prop属性 属性值为表单绑定的数据的名称

import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      ruleForm: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名必须是5-12个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码必须是6-15个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          axios({
            url: "http://localhost:8888/api/private/v1/login",
            method: "post",
            data: this.form
          }).then(({ data: { data, meta } }) => {
            // console.log(res);
            if (meta.status === 200) {
              // 如果登录成功，服务器会返回一个token
              // 将这个token存到localStorage中
              localStorage.setItem("token", data.token);
              // 跳转到home页
              this.$router.push("/home");
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style>
.el-row {
  height: 100%;
}
.el-col {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
}
</style>

