<template>
  <el-container>
      <!-- 导航栏 -->
      <el-header>
          <el-row>
                <el-col :span="6">
                    <div class="logo">网上书城</div>
                </el-col>
                <el-col :span="15">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
                      <el-menu-item index="../Index" >主页</el-menu-item>
                      <el-menu-item index="../Cart">购物车</el-menu-item>
                      <el-menu-item index="../myOrder">我的订单</el-menu-item>
                      <el-menu-item index="4" route="myOrder">我的信息</el-menu-item>
                      <div class="infoText">
                          <span style="margin-right:10px">{{time}},{{username}}</span>
                          <el-button @click="logout" class="infoBtn">退出</el-button>
                      </div>
                    </el-menu>
                </el-col>
         </el-row>
      </el-header>
      <!-- 侧边栏和主体 -->
      <el-container class="main">
          <!-- 侧边栏 -->
          <el-aside width="200px">
              <el-row class="tac">
                  <h5>分类</h5>
                  <el-menu :router="true">
                      <el-menu-item @click ="getBookCateUrl(Item)" v-for ="Item in bookCategory" :key ="Item.categoty_id" offset="1">
                          <i class="el-icon-menu"></i>
                          <span slot="title">{{ Item.category }}</span>
                      </el-menu-item>
                  </el-menu>
              </el-row>
          </el-aside>

          <!-- 主体 -->
          <el-main>
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      carouselList: [
        { id: 1, picPath: require('../pic/carousel/1.jpg') },
        { id: 2, picPath: require('../pic/carousel/2.jpg') },
        { id: 3, picPath: require('../pic/carousel/3.png') },
        { id: 4, picPath: require('../pic/carousel/4.png') }
      ],
      books: [],
      bookCategory: [],
      userid: 0,
      username: '',
      time: ''
    }
  },
  methods: {
  // 获取登录用户的id,保存
    getInfo () {
      var name = window.sessionStorage.getItem('username')
      var id = window.sessionStorage.getItem('id')
      this.username = name
      this.userid = id
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
    // 获取书籍的分类
    async getCate () {
      const { data: res1 } = await this.$http.get('books/getcate')
      if (res1.meta.stats !== 200) {
        this.$message.error('获取失败')
        console.log(res1)
      }
      this.bookCategory = res1.data
      console.log(res1)
    },
    getBookCateUrl (Item) {
      if (Item.category_id % 2 === 0) {
        var url = '/Category/' + Item.category_id
        this.$router.push(url)
        console.log(Item.category_id)
      } else {
        var url1 = '/Category1/' + Item.category_id
        this.$router.push(url1)
        console.log(Item.category_id)
      }
    }
  },
  created () {
    this.getInfo()
    this.getTime()
    this.getCate()
  }
}
</script>

<style>
.logo {
  text-align: center;
  line-height: 60px;
  border-color: #868686;
}
.main {
  margin: auto;
  width: 80%;
}

.el-header {
  width: 100%;
}

.info {
  display: flex;
  line-height: 60px;
}

.infoBtn {
  width: 70px;
  height: 40px;
  margin-left: 10px;
}
.newBook {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.author {
 font-size: 12px;
 color: gray;
}

/* 顶部导航栏 */
.infoText {
  position: absolute;
  right: 10px;
  top:50%;
  transform: translateY(-50%);
}

.el-row {
  position: relative;
}
</style>
