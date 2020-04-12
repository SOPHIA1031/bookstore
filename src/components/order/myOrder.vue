<template>
    <div class="main">
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" >
            <el-menu-item index="1" route="Index" >主页</el-menu-item>
            <el-menu-item index="2" route="Cart">购物车</el-menu-item>
            <el-menu-item index="3" route="myOrder">我的订单</el-menu-item>
            <el-menu-item index="4" route="myInfo">我的信息</el-menu-item>
            <div class="infoText">
                <span style="margin-right:10px">{{time}},{{username}}</span>
                <el-button @click="logout" class="infoBtn">退出</el-button>
            </div>
        </el-menu>
        </el-header>
        <!-- <div class="user">
            <p style="font-size:22px;font-weight:bold">收货人信息</p>
            <table>
                <tr>
                    <td class="first">姓名:</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td class="first">手机号:</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td class="first">地区:</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td class="first">地址:</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td class="first">邮编:</td>
                    <td>123</td>
                </tr>
            </table>
        </div> -->
        <div class="order">
          <p style="font-size:22px;font-weight:bold">我的历史订单</p>
        <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
            prop="title"
            label="书名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="count"
            label="数量"
            width="180">
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            >
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            >
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '3',
      tableData: [],
      queryInfo: {
        user_id: ''
      },
      user_id: ''
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
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 获取历史订单
    async getHistory () {
      this.queryInfo.user_id = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.get('orders/history/', { params: this.queryInfo })
      if (res.meta.status === 200) {
        this.tableData = res.data.books
        console.log(res)
        // console.log(this.queryInfo.user_id)
      } else {
        this.$message.error('获取历史订单错误')
        // console.log(res)
      }
    }
  },
  created () {
    this.getHistory()
    this.getInfo()
    this.getTime()
  }
}
</script>

<style scoped>
.main {
    width: 70%;
    margin: auto;
}
table {
    width: 80%;
    border: 1px solid #ccc;
    border-collapse: collapse;
}
tr {
    height: 40px;
}

td{
    border: 1px solid #ccc;
    padding-left: 10px;
}

.first {
    width: 20%;
}
.user,.order {
    border: solid 1px #868686d7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: auto;
    margin-top: 20px;
    padding: 20px;
}

.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }
</style>
