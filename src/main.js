import Vue from 'vue'
import App from './App.vue'
// import App from '@/views/Home.vue'
import router from '@/router/index'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)

// 路由守卫--跳到个人中心的一个判断
router.beforeEach((to, from, next) => {
  // 是否有token
  const hasToken = localStorage.getItem("token");

  // 是否是个人中心页
  if (to.path === '/personal') {
    //如果存在token
    if (hasToken) {
      // 直接调到个人中心
      return next();
    }
    //如果不存在token，直接调到登录页面，进行登录
    else {
      // 没有token则跳转到登录页
      return router.push("/login")
    }
  }
  //如果不是调到个人中心页面，其他页面的话直接跳转
  next();
})

// axios响应拦截器
//如果要在入口文件内使用弹出框，就必须要单独再次引入
import {
  Toast
} from 'vant'
axios.interceptors.response.use(res => {
  const {
    message,
    statusCode
  } = res.data;
  const errRegExp = /^4\d{2}$/;

  //错误提醒
  if (message && errRegExp.test(statusCode)) {
    Toast.fail(message);
  }
  //用户信息失效
  if (message === "用户信息验证失败") {
    // 跳转到登录页
    router.push("/login");
  }
  return res;
})


// 请求拦截器
// 可以拦截所有请求, 并且对其执行一个回调
axios.interceptors.request.use(config => {
  // 这里可以接受一个形参, 拿到当前请求的配置

  // 条件判断, 是否需要带上 token
  // 1. 用户已登录(有token)
  // 2. 页面内的请求代码本身没有带上 Authorization
  if (localStorage.getItem('token') && !config.headers.Authorization) {
    config.headers.Authorization = "Bearer " + localStorage.getItem('token')
  }

  // 拦截一定要放行
  return config
})

//全局过滤器
Vue.filter('fixImgUrl', function (url) {
  const fullUrlReg = /^http/
  if (fullUrlReg.test(url)) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
})


import axios from "axios";
//axios设置默认基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 绑定到原型
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')