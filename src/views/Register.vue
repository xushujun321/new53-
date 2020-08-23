<template>
  <div id="app">
    <div class="header"></div>
    <div class="closeWrapper" @click="closes">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logoWrapper">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputWrapper">
      <txt
        :type="'text'"
        class="txt"
        hasSearch="none"
        placeholder="用户名/手机号"
        :value="phone"
        @input="user"
        :rules="/^1[35789]\d{9}$/"
        err_msg="请输入用户名或11位手机号"
      ></txt>
    </div>
    <div class="inputWrapper">
      <txt
        :type="'text'"
        class="txt"
        hasSearch="none"
        placeholder="昵称"
        :value="users"
        @input="username"
        :rules="/^\w{1,16}$/"
        err_msg="请输入昵称"
      ></txt>
    </div>
    <div class="inputWrapper">
      <txt
        :type="'password'"
        class="txt"
        hasSearch="none"
        placeholder="密码"
        :value="password"
        @input="padd"
        :rules="/^[0-9a-zA-Z_.]{6,16}$/"
        err_msg="请输入密码"
      ></txt>
    </div>
    <div class="btnWrapper">
      <btn @click="regiter" :value="'注册'"></btn>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import txt from '../components/文本框封装'
import btn from '../components/按钮的封装'
//引进axios封装
import { posts } from '../components/axios封装'
export default {
  data() {
    return {
      phone: '',
      users: '',
      password: ''
    }
  },
  methods: {
    //用户名
    user(data) {
      this.phone = data
    },
    //密码
    padd(data) {
      this.password = data
    },
    //昵称
    username(data) {
      this.users = data
    },
    regiter(data) {
      console.log(data)
      //接口类型:【POST】
      //接口地址: /register
      //参数：username，password，nickname
      posts
        .post('/register', {
          username: this.phone,
          password: this.password,
          nickname: this.users
        })
        .then(function (data) {
          this.$toast.success(data.data.message)
        })
        .catch(function (err) {
          this.$toast.fail(err)
        })
      //页面跳转，调到登录页面
      location.href = '#/login'
    },
    closes() {
      location.href = '#/home'
    }
  },
  components: {
    txt,
    btn
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
.closeWrapper {
  padding: 6.667vw 6.667vw 0;
  .iconicon-test {
    font-size: 7.5vw;
  }
}
.logoWrapper {
  text-align: center;
  .iconnew {
    font-size: 35vw;
    color: #d81e06;
  }
}
.inputWrapper {
  padding: 0 6.667vw;
}
.btnWrapper {
  text-align: center;
  margin-top: 16.667vw;
  height: 13.333vw;
}
.bottom {
  background-color: rgb(24, 24, 24);
  width: 100%;
  height: 50px;
  margin-top: 225px;
}
</style>