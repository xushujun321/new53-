<template>
  <div id="app">
    <div class="header"></div>
    <div class="head">
      <div class="head_l">
        <img src="../assets/login.png" width="50" height="50" alt />
      </div>
      <input type="text" id="user" value="搜索新闻" @focus="search" />
      <span class="iconfont iconsearch"></span>
      <div class="head_user">
        <img src="../assets/user.png" width="50" height="50" alt />
      </div>
    </div>
    <!-- v-model是用来创想绑定一个数据，标识当前激活tab的索引 -->
    <van-tabs v-model="activeTab">
      <van-tab v-for="(tabItem, index) in list" :key="index" :title="tabItem.name">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <ul id="ul3" v-for="(item,index1) in list1" :key="index1">
            <wenzhang :page="item" @click="$router.push('/details/'+item.id)"></wenzhang>
          </ul>
        </van-list>
      </van-tab>
    </van-tabs>
    <router-link to="/login">登录</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/register">注册</router-link>
    <div class="bottom"></div>
  </div>
</template>

<script>
//引进文章列表组件
import wenzhang from '../components/文章列表组件封装'
export default {
  data() {
    return {
      list: [],
      show1: false,
      list1: [],
      activeTab: 0,
      loading: false,
      finished: false
      // src1=''
    }
  },
  methods: {
    search() {
      location.href = '#/search'
    },
    shows() {
      this.show1 = !this.show1
    },
    //获取对应的文章列表的封装
    loadpost() {
      //当前激活栏目,在分类列表中拿出当前激活的索引
      const index = this.list[this.activeTab]
      //从中获取id
      const categoryId = index.id
      //将当前页面+1
      index.pageIndex += 1
      //发送获取对应的文章列表

      // 文章列表
      // 接口类型:【GET】
      // 接口地址: /post
      this.$axios({
        method: 'get',
        url: '/post',
        params: {
          category: categoryId
        }
      })
        .then((res) => {
          console.log(res.data)
          this.list1 = res.data.data
          // console.log(this.list1[0].cover[0].url)
          // console.log(this.list1[0].cover[0].url.split('?')[0])
          // const newData = res.data.data.map((category) => {
          //   return {
          //     ...category,
          //     postList: [],
          //     //是否正在加载
          //     loading: false,
          //     //是否全部加载
          //     finished: false,
          //     //当前页面
          //     pageIndex: 1,
          //     //每页显示的数据数量
          //     pageSize: 5
          //   }
          // })
          // //每加载一次，不是重新刷新页面数据，而是在当前页面数据后面继续添加
          // index.postList = [...categoryId.postList, ...res.data.data]
          // //这里加载完了文章列表数据，然后需要手动将当前栏目的加载状态改回false
          // //也就是没有正在加载，这样子才能在下次拉倒底部的时候重新触发加载下一页
          // index.loading = false
          // //最后发现数据已经加载到尽头了。应该告诉组件已经完毕，禁止再次发送请求
          // //什么时候我们知道加载完了所有数据
          // //我们设置了每页的长度，正常情况下数据库应该返回对应的数据
          // //如果有一次，返回的数据数量比规定页面长度小，那么知道数据库已经见底了
          // if (res.data.data.length < index.pageSize) {
          //   index.finished = true
          // }
          // this.list1 = newData
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //加载更多
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list1.push(this.list1.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list1.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    tiao() {}
  },
  components: {
    wenzhang
  },
  watch: {
    //激活码的监听
    activeTab() {
      this.loadpost()
    }
  },
  computed: {
    categoryId() {
      //当前激活栏目,在分类列表中拿出当前激活的索引
      const index = this.list[this.activeTab]
      //从中获取id
      return index.id
    }
  },
  mounted() {
    //获取栏目列表
    //接口类型:【GET】
    //验证:【Authorization 】
    //接口地址:/category
    this.$axios({
      method: 'get',
      url: '/category',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        console.log(res.data)
        this.list = res.data.data
        //文章列表的加载渲染
        this.loadpost()
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
  margin-top: 30px;
}
.head {
  width: 100%;
  background-color: rgb(255, 0, 0);
  height: 50px;
  display: flex;
  position: relative;
  .head_l {
    width: 50px;
    height: 50px;
    margin: 0 15px;
    float: left;
  }
  .head_user {
    width: 50px;
    height: 50px;
    margin: 0 15px;
    float: right;
  }
  #user {
    flex: 1;
    margin: auto 0;
    height: 40px;
    padding: 0;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    border-radius: 20px;
    color: #fff;
  }
  .iconsearch {
    position: absolute;
    top: 25px;
    transform: translateY(-50%);
    left: 150px;
    font-size: 20px;
    color: #fff;
  }
}
.lan {
  width: 100%;
  height: 50px;
  display: flex;
  position: relative;
  .nav {
    flex: 1;
    height: 50px;
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    li {
      width: 61px;
      height: 50px;
      line-height: 50px;
      float: left;
      text-align: center;
      -webkit-flex: 1 0 auto;
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
    }
  }
  .iconjiantou1 {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    transform: rotate(90deg);
    background-color: #f1f1f1;
  }
  #ul2 {
    width: 100px;
    height: 150px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 50px;
    right: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
  }
}
.tie {
  width: 100%;
  overflow: hidden;
  padding: 20px 10px;
  border-bottom: 1px solid #e6e2e2;
  box-sizing: border-box;
  .zi {
    width: 100%;
    height: 55px;
    font-size: 17px;
    line-height: 25px;
    text-align: left;
  }
  .tu {
    width: 100%;
    height: 70px;
    margin-bottom: 10px;
    display: flex;
    img {
      width: 125px;
      &:nth-child(2) {
        margin: 0 5px;
      }
    }
  }
  .xia {
    width: 100%;
    text-align: left;
    .bao {
      font-size: 16px;
      color: #afafaf;
      margin: 0 10px;
      display: inline-block;
      &:nth-child(1) {
        margin-left: 0;
      }
    }
  }
  .shi {
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 150px;
    position: relative;
    .iconshipin {
      width: 80px;
      height: 80px;
      background-color: #d3d3d3;
      color: #fff;
      font-size: 50px;
      border-radius: 40px;
      text-align: center;
      line-height: 80px;
    }
  }
}
#ul2 {
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>