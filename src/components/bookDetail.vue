<template>
    <el-container>
        <!-- 导航栏 -->
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
              <el-menu-item index="1" @click="goHome">主页</el-menu-item>
              <el-menu-item index="2" @click="goCart">购物车</el-menu-item>
              <el-menu-item index="3" @click="goOrder">我的订单</el-menu-item>
              <el-menu-item index="4" @click="goMyInfo">我的信息</el-menu-item>
              <div class="infoText">
                  <span style="margin-right:10px;line-height:40px">{{time}},{{username}}</span>
                  <el-button @click="logout" class="infoBtn">退出</el-button>
              </div>
          </el-menu>
        </el-header>
        <el-main>
            <!-- 书籍介绍 -->
            <div class="book">
                <span style="font-size:26px;font-weight:bold">{{book.title}}</span>
                <hr>
                <div class="bookContainer">
                    <div class="bookPic">
                        <img :src="getImageUrl(book.id)" width="250px" height="300px">
                    </div>
                    <div class="bookOther">
                        <p>售价：{{book.price}}</p>
                        <p>作者：{{book.author}}</p>
                        <hr>
                        <p>页数:356</p>
                        <p>出版社:{{book.publisher}}</p>
                        <p>出版日期:2008-10</p>
                        <hr>
                        <p>分类：{{book.category}}</p>
                        <p>销售量：{{total}}</p>
                        <hr>
                        <el-button type="primary" @click="cartAdd" icon="el-icon-shopping-cart-2" >加入购物车</el-button>
                    </div>
                </div>
            </div>
            <!-- 内容简介 -->
            <div class="content book">
                <span style="font-size:26px">内容简介</span>
                <hr>
                <p>{{ book.content }}</p>
            </div>
            <!-- 作者简介 -->
            <div class="authorIntro book">
                <span style="font-size:26px">作者简介</span>
                <hr>
                <p>{{ book.author_info }}</p>
            </div>
            <!-- 书的目录 -->
            <div class="book">
                <span style="font-size:26px">目录</span>
                <hr>
                <p v-for="cate in book.catalogue" :key="cate">{{ cate }}</p>
            </div>
            <!-- 评论 -->
            <div class="book">
                <span style="font-size:26px">评论</span>
                <hr>
                  <el-input type="textarea" placeholder="发表你对这本书的评价吧"
                            v-model="textarea"  maxlength="100" show-word-limit>
                  </el-input>
                  <el-button type="primary" class="btnCommit" @click="commit">提交</el-button>
                <div class="comments" v-for="item in book.comment" :key="item.customer">
                  <p>{{ item.content}}</p>
                  <p>发布者：{{ item.customer}}</p>
                  <hr>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      activeIndex: '1',
      book: {},
      queryInfo: {
        id: ''
      },
      total: 0, // 书本总数
      textarea: '', // 评价
      imageUrl: ''
    }
  },
  methods: {
    // 根据路径中的id获取对应书本的其他数据
    async getBook () {
      var bookid = this.$route.params.id
      this.queryInfo.id = bookid
      const { data: res } = await this.$http.get('books/one/?', { params: this.queryInfo })
      if (res.meta.status === 200) {
        this.book = res.data
        console.log(res)
      } else {
        this.$message.err('err!')
        console.log(res)
      }
      this.imageUrl = res.data.url
      // console.log(this.imageUrl)
    },
    // 获取书本封面图片
    getImageUrl (id) {
      return this.imageUrl
    },
    // 加入购物车
    async cartAdd () {
      // 将对应的商品编号和用户编号发给服务器
      var userid = window.sessionStorage.getItem('id')
      var data = {
        user_id: userid,
        books: [{
          book_id: this.book.id,
          count: 1
        }]
      }
      const { data: res } = await this.$http.post('orders/add/', data)
      if (res.meta.status === 200) this.$message.success('成功加入购物车')
      else {
        console.log(res)
        this.$message.err('出现错误')
      }
    },
    // 提交评论
    async commit () {
      var userid = window.sessionStorage.getItem('id')
      var bookid = this.$route.params.id
      var data = { user_id: userid, book_id: bookid, content: this.textarea }
      // 限制评论不为空
      if (this.textarea === '') return this.$message.err('评论不能为空')
      // 发送post请求
      const { data: res } = await this.$http.post('books/comment/', data)
      if (res.meta.status === 200) {
        this.$message.success('发表评论成功')
        this.textarea = ''
        this.getBook()
      } else {
        console.log(res)
        this.$message.err('评论失败')
      }
    },
    // 返回主页
    goHome () {
      this.$router.push('/index')
    },
    // 返回购物车
    goCart () {
      this.$router.push('/cart')
    },
    // 返回订单
    goOrder () {
      this.$router.push('/myOrder')
    },
    // 返回个人信息
    goMyInfo () {
      this.$router.push('/myInfo')
    },
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
    }
  },
  created () {
    this.getInfo()
    this.getTime()
    this.getBook()
  }
}
</script>

<style scoped>
.el-header {
  width: 65%;
  margin: auto;
  position: relative;
}
.infoText {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.book {
    width: 60%;
    border: solid 1px #868686d7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: auto;
    margin-top: 20px;
    padding: 20px;
}

.bookContainer {
    display: flex;
}

.bookOther {
    width: 60%;
}

.el-button{
  float: right;
}

.btnCommit {
  margin-top: 10px;
  padding: 7px 15px;
}
</style>
