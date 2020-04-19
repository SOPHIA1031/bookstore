<template>
    <div class="tableContainer">
      <!-- 顶部导航栏 -->
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" >
            <el-menu-item index="1" route="Index" >主页</el-menu-item>
            <el-menu-item index="2" route="Cart">购物车</el-menu-item>
            <el-menu-item index="3" route="myOrder">我的订单</el-menu-item>
            <el-menu-item index="4" route="myOrder">我的信息</el-menu-item>
            <div class="infoText">
                <span style="margin-right:10px">{{time}},{{username}}</span>
                <el-button @click="logout" class="infoBtn">退出</el-button>
            </div>
        </el-menu>
      </el-header>
      <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="selected">
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column label="商品图片" width="200">
        <template scope="scope">
          <div style="margin-left: 50px">
            <img :src="scope.row.url" style="height: 100px;width: 100px">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200" prop="title"></el-table-column>
      <el-table-column label="单价" width="150" prop="price"></el-table-column>
      <el-table-column label="数量" width="200">
        <template scope="scope">
          <div>
            <el-input v-model="scope.row.count">
              <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
              <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小计" width="150" prop="goodTotal"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除<i class="el-icon-delete2 el-icon--right"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="10"><el-input placeholder="请输入收货地址" prefix-icon="el-icon-location" v-model="orderlist.address"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" style="float:right" @click="buy">确认购买</el-button></el-col>
    </el-row>
    <el-button type="warning" plain class="btnTotal">{{"所选商品总价：" + moneyTotal}}</el-button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '2',
      tableData: [],
      multipleSelection: [],
      moneyTotal: 0,
      queryInfo: {
        id: ''
      },
      // address: '', // 地址
      modifyInfo: {
        user_id: '',
        book_id: '',
        count: 1
      },
      orderlist: {
        user_id: '',
        books: [],
        address: ''
      },
      buyInfo: {
        user_id: '',
        order_id: ''
      }
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
    // table默认方法
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取商品列表
    async getGoods () {
      var userid = window.sessionStorage.getItem('id')
      this.queryInfo.id = userid
      const { data: res } = await this.$http.get('orders/?', { params: this.queryInfo })
      if (res.meta.status === 200) {
        this.tableData = res.data.books
        // 获取每本书的小计
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].goodTotal = this.tableData[i].price * this.tableData[i].count
        }
      } else {
        this.$message.err('获取购物车列表出错')
        console.log(res)
      }
    },
    // 删除商品
    async handleDelete (index, row) {
      var bookId = row.book_id // 书籍id
      var userId = window.sessionStorage.getItem('id') // 用户id
      var data = {
        user_id: userId,
        book_id: bookId
      } // 请求参数
      console.log(data)
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 成功删除
        this.$http.post('orders/delete/', data)
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 增加数量并更新小计
    async add (addGood) {
      // 输入框输入值变化时会变为字符串格式返回到js
      if (typeof addGood.count === 'string') {
        addGood.count = parseInt(addGood.count)
      }
      addGood.count += 1
      addGood.goodTotal = addGood.count * addGood.price
      this.selected(this.multipleSelection)
      this.modifyInfo.user_id = window.sessionStorage.getItem('id') // 获取id
      this.modifyInfo.book_id = addGood.book_id // 获取书id
      this.modifyInfo.count = addGood.count // 获取新数量
      // 发送post请求修改对应书籍数量
      const { data: res } = await this.$http.post('orders/modify/', this.modifyInfo)
      if (res.meta.status !== 200) console.log('修改数量失败')
    },
    // 数量减少
    // delGood为对应的那一行信息
    async del (delGood) {
      if (typeof delGood.count === 'string') {
        delGood.count = parseInt(delGood.count)
      }
      if (delGood.count > 1) {
        delGood.count -= 1
      }
      delGood.goodTotal = delGood.count * delGood.price
      this.selected(this.multipleSelection)
      this.modifyInfo.user_id = window.sessionStorage.getItem('id') // 获取id
      this.modifyInfo.book_id = delGood.book_id // 获取书id
      this.modifyInfo.count = delGood.count // 获取新数量
      // 发送post请求修改对应书籍数量
      const { data: res } = await this.$http.post('orders/modify/', this.modifyInfo)
      if (res.meta.status !== 200) console.log('修改数量失败')
    },
    // 计算商品总价
    // 参数selection为选中行对应的对象
    selected (selection) {
      this.multipleSelection = selection
      this.moneyTotal = 0
      // 此处不支持forEach循环，只能用原始方法
      for (var i = 0; i < selection.length; i++) {
        // 判断返回的值是否是字符串
        if (typeof selection[i].goodTotal === 'string') {
          selection[i].goodTotal = parseInt(selection[i].goodTotal)
        }
        this.moneyTotal += selection[i].goodTotal
      }
    },
    // 购买选中商品
    async buy () {
      // 地址不能为空
      if (this.orderlist.address === '') return this.$message.error('地址不能为空')
      // 购物车不能为空
      if (this.multipleSelection.length === 0) return this.$message.error('购物车不能为空')
      this.orderlist.user_id = window.sessionStorage.getItem('id')
      var selections = this.multipleSelection // 选中的商品数组
      // var bookList = [] // 提交的书籍id列表
      for (var i = 0; i < selections.length; i++) {
        this.orderlist.books[i] = selections[i].book_id
      }
      // console.log(this.orderlist)
      const { data: res } = await this.$http.post('orders/commit/', this.orderlist)
      if (res.meta.status === 200) {
        console.log(res)
        this.buyInfo.user_id = this.orderlist.user_id
        this.buyInfo.order_id = res.data.order_id
        await this.$http.post('orders/purchase/', this.buyInfo)
        this.$router.push('/myOrder')
      } else {
        this.$message.err('订单出错了！')
        console.log(res)
      }
    }
  },
  created () {
    this.getGoods()
    this.getInfo()
    this.getTime()
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
.tableContainer {
  width: 70%;
  margin: auto;
}

.btnTotal {
  position: fixed;
  right: 0;
  top: 100px;
}
</style>
