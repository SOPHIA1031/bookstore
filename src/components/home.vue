<template>
    <div>
        <!-- 轮播图 -->
        <div class="block">
            <el-carousel height="400px">
                <el-carousel-item v-for="item in carouselList" :key="item.id">
                    <img :src="item.picPath">
                </el-carousel-item>
                </el-carousel>
            </div>
        <!-- 新书上架 -->
        <h3>新书上架</h3>
        <hr>
        <div class="newBook">
            <div v-for="book in books" :key="book.id">
                <img :src="getImageUrl(book.id)" width="140px" height="140px">
                <!-- 书籍相关信息 -->
                <div>
                      <li @click="getBookUrl(book.id)" >{{ book.title }} </li>
                      <span class="author">{{ book.author }} </span>
                      <br><span class="price">{{ book.price }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图
      carouselList: [
        { id: 1, picPath: require('../pic/carousel/1.jpg') },
        { id: 2, picPath: require('../pic/carousel/2.jpg') },
        { id: 3, picPath: require('../pic/carousel/3.png') },
        { id: 4, picPath: require('../pic/carousel/4.png') }
      ],
      books: [],
      bookCategory: [],
      queryInfo: {
        query: '' // 查询参数
      },
      imageUrl: []
    }
  },
  methods: {
    // 获取最新上架书籍
    async getBooks () {
      const { data: res } = await this.$http.get('books', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        this.$message.err('获取失败')
        return console.log(res)
      }
      // 前4本书加入最近上新，显示在主页
      for (var i = 0; i < 4; i++) {
        var book = res.data.books[i]
        this.books.push(book)
      }
      this.imageUrl = res.data.books
      console.log(this.imageUrl)
    },
    // 获取图片路径
    getImageUrl (id) {
      var Url = this.imageUrl[id - 1].url
      return Url
    },
    // 跳转到书本详情页
    getBookUrl (id) {
      var url = '/book/' + id
      this.$router.push(url)
    }
  },
  created () {
    this.getBooks()
  }
}
</script>

<style >
.newBook {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.author {
   font-size: 12px;
   color: gray;
   line-height: 10px;
}

li {
  list-style: none;
  cursor: pointer;
  color: rgb(82, 148, 224);
}

</style>
