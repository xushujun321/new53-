<template>
  <div id="app">
    <div class="header"></div>
    <head1 :name1="headename" @click="submit"></head1>
    <ul class="deletecolumn">
      <span>点击删除以下频道</span>
      <li v-for="(item,index) in list1" :key="index" @click="dev(index)">{{item.name}}</li>
    </ul>
    <ul class="addcolumn">
      <span>点击议案家以下频道</span>
      <li v-for="(item,index) in list2" :key="index" @click="add(index)">{{item.name}}</li>
    </ul>
    <div class="bottom"></div>
  </div>
</template>

<script>
//引进头部组件
import head1 from '../components/封装头部组件'
export default {
  data() {
    return {
      headename: '栏目管理',
      list1: [],
      list2: []
    }
  },
  components: {
    head1
  },
  methods: {
    dev(index) {
      if (this.list1.length <= 1) {
        return
      }
      this.list2.push(this.list1[index])
      this.list1.splice(index, 1)
    },
    add(index) {
      this.list1.push(this.list2[index])
      this.list2.splice(index, 1)
    },
    submit() {
      this.$router.go(-1)
    },
    load() {
      // 栏目列表
      // 接口类型:【GET】
      // 验证:【Authorization 】（该接口不强制要求登录，但是对于登录的用户，加上token信息会返回关注栏目）
      // 接口地址:/category
      this.$axios({
        method: 'get',
        url: '/category'
      })
        .then((res) => {
          console.log(res)
          this.list1 = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    //监听其中一个表就可以了
    list1() {
      localStorage.setItem('devcolumn', JSON.stringify(this.list1))
      localStorage.setItem('addcolumn', JSON.stringify(this.list2))
    }
  },
  created() {
    if (localStorage.getItem('devcolumn')) {
      this.list1 = JSON.parse(localStorage.getItem('devcolumn'))
    } else {
      //加载栏目列表
      this.load()
    }
    if (localStorage.getItem('addcolumn')) {
      this.list2 = JSON.parse(localStorage.getItem('addcolumn'))
    }
  },
  mounted() {}
}
</script>

<style  scoped  lang="less">
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
  margin-top: 150px;
}
.deletecolumn,
.addcolumn {
  width: 100%;
  overflow: hidden;
  padding: 10/360 * 100vw;
  margin: 0;
  list-style: none;
  span {
    display: block;
    height: 25/360 * 100vw;
    line-height: 25/360 * 100vw;
    color: rgb(141, 141, 141);
    font-size: 15px;
  }
  li {
    float: left;
    padding: 9/360 * 100vw 12/360 * 100vw;
    border: 1px solid rgb(197, 197, 197);
    margin: 8/360 * 100vw 8/360 * 100vw;
    font-size: 15px;
  }
}
</style>