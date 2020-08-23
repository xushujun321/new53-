<template>
  <div id="app">
    <div class="header"></div>
    <div class="header1">
      <img :src="'http://127.0.0.1:3000'+head_img" v-if="head_img" height="70" width="70" />
      <img src="../assets/logo.png" v-else height="70" width="70" />
      <div class="right">
        <div class="top">
          <span class="iconfont" :class="gen"></span>
          {{name}}
        </div>
        <div class="bottom1">{{time | time3('-')}}</div>
        <span class="iconfont iconjiantou1" @click="hrefs"></span>
      </div>
    </div>
    <div class="heng"></div>
    <div id="ul" v-for="(item,index) in lis1" :key="index">
      <lis :left="item.li_left" :right="item.li_right" @click="item.href"></lis>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
//引进axios封装
import { posts } from '../components/axios封装'
//引进条形组装
import lis from '../components/封装条形列表'
//引进公共vue
import bus from '../components/eventBus'
export default {
  data() {
    return {
      lis1: [
        {
          li_left: '我的关注',
          li_right: '关注的用户',
          href: function () {
            location.href = '#/attention'
          }
        },
        {
          li_left: '我的跟帖',
          li_right: '跟帖/回复',
          href: function () {
            location.href = '#/follow'
          }
        },
        {
          li_left: '我的收藏',
          li_right: '文章视频',
          href: function () {
            location.href = '#/collect'
          }
        },
        {
          li_left: '设置',
          li_right: '',
          href: function () {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            location.href = '#/login'
          }
        }
      ],
      name: '',
      time: new Date(),
      head_img: '',
      gen: '',
      user: []
    }
  },
  methods: {
    load() {
      // 接口类型:【GET】
      // 需要验证:【Authorization 】
      // 接口地址:/user/:id
      // 参数: :id
      //获取id
      let id = localStorage.getItem('userId')
      this.$axios({
        url: 'http://127.0.0.1:3000/user/' + id,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((data) => {
        console.log(data.data)
        if (data.data.data.gender == 1) {
          this.gen = 'iconxingbienan'
        } else {
          this.gen = 'iconxingbienv'
        }
        this.head_img = data.data.data.head_img
        this.name = data.data.data.nickname
        // this.user.gender1=data.data.data.gender
        // this.user.head_img1=data.data.data.head_img
        // this.user.head_img1=data.data.data.head_img
      })
    },
    hrefs() {
      location.href = '#/redact'
    },
    shijian() {
      bus.$on('click', (data) => {
        console.log(111)
      })
    }
  },
  filters: {
    time3(value, t) {
      //获取当前时间
      let year = value.getFullYear()
      let mouth = value.getMonth() + 1
      let day = value.getDate()
      return `${year}${t}${mouth}${t}${day}`
    }
  },
  components: {
    lis
  },
  mounted: function () {
    this.load()
  }
}
</script>

<style lang="less" scoped>
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
#app {
  background-color: #f1f1f1;
}
.header {
  width: 100%;
  height: 30px;
  background-color: rgb(136, 135, 135);
}

.bottom {
  background-color: rgb(24, 24, 24);
  width: 100%;
  height: 50px;
  margin-top: 225px;
}
.header1 {
  width: 100%;
  height: 120px;
  padding: 25px 0 25px 20px;
  box-sizing: border-box;
  text-align: left;
  display: flex;
}
.right {
  flex: 1;
  display: inline;
  text-align: left;
  padding: 15px 0 0 10px;
  line-height: 20px;
  box-sizing: border-box;
  position: relative;
  .top {
    // font-weight: bold;
    font-size: 18px;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 10px;
      vertical-align: middle;
    }
    .iconxingbienan {
      //   background-color: rgba(21, 159, 194, 0.767);
      background-color: #fff;
      color: rgba(21, 159, 194, 0.767);
      font-size: 20px;
    }
  }
  .bottom1 {
    font-size: 15px;
    font-weight: normal;
    margin-top: 10px;
  }
  .iconjiantou1 {
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 32px;
  }
}
.heng {
  width: 100%;
  height: 8px;
  background-color: rgb(224, 219, 219);
}
#ul {
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>