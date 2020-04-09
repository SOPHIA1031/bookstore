<template>
            <!-- 注册表单 -->
            <el-form label-width="70px"  class="formBox"  :model="userRegForm" :rules="regRules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userRegForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userRegForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telephone">
                    <el-input v-model="userRegForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userRegForm.email"></el-input>
                </el-form-item>
                <el-form-item  class="btns">
                    <el-button type="primary" @click="Register">注册</el-button>
                </el-form-item>
            </el-form>
</template>

<script>
export default {
  data () {
    return {
      //    表示一个表单数据绑定对象
      userRegForm: {
        username: '',
        password: '',
        telephone: '',
        email: ''
      },

      //    表单的验证规则对象
      regRules: {
        //  验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        //  验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // post注册表单
    async Register () {
      const { data: res } = await this.$http.post('auth/register/', this.userRegForm)
      console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('注册成功,请登录！')
      } else {
        this.$message.err('出现错误')
        console.log(res)
      }
    }
  }
}
</script>

<style scoped>
.formBox {
  width: 80%;
  position: absolute;
  left: 50px;
}
.btns {
    float:right;
}
</style>
