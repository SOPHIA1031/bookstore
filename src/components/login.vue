<template>
      <div class="loginContainer">
        <div class="loginBox">
          <!-- 标题 -->
          <!-- <div class="text">
            <p class="title">Bookstore</p>
            <p class="slogan">阅读是一种生活习惯</p>
          </div> -->
          <!-- 标签页切换组件 -->
            <el-tabs type="card" v-model="currentView">
              <!-- 引入登录组件 -->
              <el-tab-pane label="登录" name="log"></el-tab-pane>
              <!-- 引入注册组件 -->
              <el-tab-pane label="注册" name="register"></el-tab-pane>
            </el-tabs>
            <!--:is 的作用：会将div标签转换成 currentView 变量绑定的这个组件-->
            <div :is="currentView" keep-alive></div>
        </div>
    </div>
</template>

<script>
import Log from '../components/loginRegister/log.vue'
import Register from '../components/loginRegister/register.vue'

export default {
  components: {
    log: Log,
    register: Register
  },
  data () {
    return {
    // 默认第一个选项卡
      currentView: 'log'
    }
  }

}
</script>
<style>
.loginContainer {
    height: 100%;
    /* background-color: #2b4b6b; */
}

.loginBox {
    width: 500px;
    height: 350px;
    background-color: whitesmoke;
    border-radius: 5%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.text {
  position: absolute;
  left: 50%;
  top:10%;
  transform: translateX(-50%);
}
.title {
  text-align: center;
  line-height: 0%;
  font-size: 30px;
}

.slogan {
  font-size: 15px;
  text-align: center;
  margin-bottom: 15px;
}

</style>
