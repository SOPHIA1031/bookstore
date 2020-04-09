<template>
    <div>
        <!-- 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item v-model="queryInfo.id">{{ category }}</el-breadcrumb-item>
          </el-breadcrumb>
        <!-- 布局 -->
        <el-row >
            <el-col :span="9">
                <!-- 搜索框 -->
                <el-input placeholder="请输入内容" v-model="queryInfo2.query" clearable @clear="getBookList">
                <el-button slot="append" icon="el-icon-search" @click="searchBook"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 卡片视图区 -->
        <el-row :span="10" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
            <el-col :span="5" v-for="book in booklist" :key="book.id" :offset="1" >
              <el-card :body-style="{ padding: '0px' }">
                <!-- <div  v-for="book in booklist" :key="book.id"> -->
                  <img :src="getImageUrl(book.id)" class="image" height="250px">
                  <div style="padding: 14px; text-align: center;">
                    <li @click="getBookUrl(book.id)">{{ book.title }}</li>
                    <!-- <div class="bottom clearfix">
                    <el-button type="text" class="button">加入购物车</el-button>
                    </div> -->
                  </div>
                <!-- </div> -->
              </el-card>
            </el-col>
          </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取书籍列表的参数对象
      queryInfo: {
        id: ''
      },
      queryInfo2: {
        query: ''
      },
      booklist: [],
      total: 0,
      category: '',
      imageUrl: []
    }
  },
  created () {
    this.getBookList()
  },
  methods: {
    // 根据路径中的id获取对应分类的书目
    async getBookList () {
      var CateId = this.$route.params.categoty_id
      this.queryInfo.id = CateId
      console.log(this.queryInfo.id)
      const { data: res } = await this.$http.get('books/category', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.booklist = res.data.books
      this.category = this.booklist[1].category
      // console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        var book = res.data.books[i]
        this.booklist.push(book)
      }
      this.imageUrl = res.data.books
      // console.log(this.imageUrl)
    },
    // 搜索书籍
    async searchBook () {
      const { data: res } = await this.$http.get('books', {
        params: this.queryInfo2
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.total = res.data.total
      this.booklist = res.data.books
      // console.log(res)
    },
    // 跳转到书本详情页
    getBookUrl (id) {
      // console.log(id)
      var url = '/book/' + id
      this.$router.push(url)
    },
    // 获取图片路径
    getImageUrl (id) {
      for (var i = 0; i < this.imageUrl.length; i++) {
        var Url
        if (id === this.imageUrl[i].id) Url = this.imageUrl[i].url
      }
      return Url
    }
  }
}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
