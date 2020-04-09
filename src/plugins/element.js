import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, MessageBox, Container, Header, Aside,
  Main, Footer, Menu, MenuItemGroup, MenuItem, Row, Col, Carousel, CarouselItem, Avatar,
  Tabs, TabPane, TableColumn, Table, InputNumber, Steps, Step
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Avatar)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)
Vue.use(Steps)
Vue.use(Step)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
