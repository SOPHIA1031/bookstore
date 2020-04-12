<template>
    <div>
      <div class="text">
        <p class="title">Bookstore</p>
        <p class="slogan">阅读是一种生活习惯</p>
      </div>
    <!-- 登录表单 -->
    <el-form label-width="70px"  class="formBox"  :model="loginForm" :rules="loginRules" ref="loginFormRefs">
        <el-form-item label="手机号"  prop="telephone">
            <el-input v-model="loginForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item  class="btns">
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      //    表示一个表单数据绑定对象
      loginForm: {
        telephone: '15927290862',
        password: '123456'
      },

      //    表单的验证规则对象
      loginRules: {
        //  验证用户名是否合法
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        //  验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const { data: res } = await this.$http.post('auth/login/', this.loginForm)
      if (res.meta.status !== 200) {
        return this.$message.error('用户名或者密码错误')
      }
      this.$message.success('登录成功')
      window.sessionStorage.setItem('username', res.data.username)
      window.sessionStorage.setItem('id', res.data.id) // 保存用户id
      this.$router.push('/index')
    }
  }
}
</script>

<style>
.formBox {
  width: 80%;
  position: absolute;
  left: 50px;
  bottom: 10px;
}
.btns {
    float:right;
}
</style>
