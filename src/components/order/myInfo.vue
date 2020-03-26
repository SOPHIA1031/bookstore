<template>
    <el-container>
    <!-- 导航栏 -->
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" >
          <el-menu-item index="index" >主页</el-menu-item>
          <el-menu-item index="Cart" >购物车</el-menu-item>
          <el-menu-item index="myOrder" >我的订单</el-menu-item>
          <el-menu-item index="myInfo" >我的信息</el-menu-item>
          <div class="infoText">
              <span style="margin-right:10px;line-height:40px">{{time}},{{userModifyForm.username}}</span>
              <el-button @click="logout" class="infoBtn">退出</el-button>
          </div>
      </el-menu>
    </el-header>
    <el-main>
        <p>修改个人信息</p>
        <el-form :label-position="labelPosition" label-width="80px" :model="userModifyForm">
        <el-form-item label="用户ID"> {{userModifyForm.uid}}
        </el-form-item>
        <el-form-item label="新用户名">
            <el-input v-model="userModifyForm.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="userModifyForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新手机号">
            <el-input v-model="userModifyForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱">
            <el-input v-model="userModifyForm.email"></el-input>
        </el-form-item>
        <el-button type="primary" @click="modify" style="float:right">提交</el-button>
        </el-form>
    </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'myInfo',
      labelPosition: 'right',
      userModifyForm: {
        uid: '',
        username: '',
        password: '',
        telephone: '',
        email: ''
      }
    }
  },
  methods: {
    // 获取用户id和用户名
    getId () {
      this.userModifyForm.uid = window.sessionStorage.getItem('id')
      var name = window.sessionStorage.getItem('username')
      this.userModifyForm.username = name
    },
    // 获取时间
    getTime () {
      var day = new Date()
      var hour = day.getHours()
      if (hour > 6 && hour < 12) this.time = '早上好'
      else if (hour >= 12 && hour < 18) this.time = '下午好'
      else this.time = '晚上好'
    },
    // 退出登录
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 修改用户信息
    async modify () {
      const { data: res } = await this.$http.post('auth/modify/', this.userModifyForm)
      if (res.meta.status === 200) {
        this.$alert('新用户名:' + res.data.username + '     新邮箱:' + res.data.email + '    新手机号:' + res.data.telephone,
          '提示')
        //   , {
        //     confirmButtonText: '确定',
        //     callback: action => {
        //       this.$message({
        //         type: 'info',
        //         message: `action: ${action}`
        //       })
        //     }
        //   }
        console.log(res)
        this.userModifyForm.password = ''
        this.userModifyForm.telephone = ''
        this.userModifyForm.email = ''
      } else {
        this.$message.error(res.meta.message)
      }
    }
  },
  created () {
    this.getId()
    this.getTime()
  }
}
</script>

<style scoped>
.el-container {
    width: 70%;
    margin: auto;
}
.el-main {
    width: 60%;
}
.el-main p {
    font-size: 25px;
}
</style>
