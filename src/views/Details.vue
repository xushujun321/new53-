<template>
  <div id="app">
    <div class="header"></div>
    <div class="head">
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <span class="iconfont iconnew"></span>
      <div class="guanzhu" v-if="list.has_follow===true" @click="quguan(list.id)">已关注</div>
      <div class="wguanzhu" v-else @click="guanz(list.id)">关注</div>
    </div>
    <div class="putong" v-if="list.type==1">
      <div class="title">{{list.title}}</div>
      <div class="xia">
        <div class="bao">{{list.user.nickname}}</div>
        <div class="bao">{{list.comment_length}}跟帖</div>
      </div>
      <div class="nr" v-html="list.content"></div>
      <div class="he">
        <div class="zan" v-if="list.has_like===false" @click="zan1(list.id)">
          <span class="iconfont icondianzan"></span>112
        </div>
        <div class="zan1" v-if="list.has_like===true" @click="zan1(list.id)">
          <span class="iconfont icondianzan"></span>113
        </div>
        <div class="zan">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>
    <div class="shipin" v-if="list.type==2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
        controls
        :poster="$axios.defaults.baseURL+list.user.head_img"
      ></video>
      <div class="xia">
        <div class="bao">{{list.user.nickname}}</div>
        <div class="gz">关注</div>
      </div>
      <div class="title">{{list.title}}</div>
      <div class="he">
        <div class="zan" v-if="list.has_like===false" @click="zan1(list.id)">
          <span class="iconfont icondianzan"></span>
          {{list.like_length}}
        </div>
        <div class="zan1" v-if="list.has_like===true" @click="zan1(list.id)">
          <span class="iconfont icondianzan"></span>
          {{list.like_length+1}}
        </div>
        <div class="zan">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>
    <div class="heng"></div>
    <comment :list="data" @click="$router.push('/comment/'+$route.params.id)"></comment>
    <write @reload="reload"></write>
    <div class="bottom"></div>
  </div>
</template>

<script>
//引进评论
import comment from '../components/精彩跟帖进行封装'
//引进输入框
import write from '@/components/跟帖输入框的封装'
export default {
  data() {
    return {
      list: {},
      data: []
    }
  },
  components: {
    comment,
    write
  },
  methods: {
    reload() {
      //重新加载评论列表数据
      this.get_comment(this.$route.params.id)
    },
    // 评论列表
    // 接口类型:【GET】
    // 接口地址: /post_comment/:id
    get_comment(id) {
      this.$axios({
        method: 'get',
        url: '/post_comment/' + id
      })
        .then((res) => {
          res.data.data.length = 3
          this.data = res.data.data
          console.log(this.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //关注按钮的点击事件取消关注
    // 取消关注用户
    // 接口类型:【GET】
    // 需要验证:【Authorization 】
    // 接口地址: /user_unfollow/:id
    quguan(id) {
      this.$axios({
        method: 'get',
        url: '/user_unfollow/' + id
      })
        .then((res) => {
          console.log(res.data)
          this.list.has_follow = !this.list.has_follow
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //关注事件
    // 关注用户
    // 接口类型:【GET】
    // 需要验证:【Authorization 】
    // 接口地址: /user_follows/:id
    guanz(id) {
      this.$axios({
        method: 'get',
        url: '/user_follows/' + id
      })
        .then((res) => {
          console.log(res.data)
          this.list.has_follow = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //点赞事件
    zan1(id) {
      // 点赞文章
      // 接口类型:【GET】
      // 需要验证:【Authorization 】
      // 接口地址: /post_like/:id
      this.$axios({
        method: 'get',
        url: '/post_like/' + id
      })
        .then((res) => {
          console.log(res.data)
          this.list.has_like = !this.list.has_like
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    //加载评论列表
    this.get_comment(this.$route.params.id)

    console.log(this.$route.params.id)
    this.id1 = this.$route.params.id
    // 文章详情
    // 接口类型:【GET】
    // 接口地址: /post/:id
    this.$axios({
      method: 'get',
      url: '/post/' + this.$route.params.id
    })
      .then((res) => {
        // console.log(res.data)
        this.list = res.data.data
        // console.log(this.list)
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
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  .iconjiantou2 {
    font-size: 28px;
    float: left;
    line-height: 50px;
  }
  .iconnew {
    font-size: 80px;
    float: left;
    line-height: 50px;
  }
  .guanzhu {
    width: 100px;
    height: 30px;
    float: right;
    border: 1px solid #333;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    margin: 10px 0;
  }
  .wguanzhu {
    width: 100px;
    height: 30px;
    float: right;
    border: 1px solid red;
    background-color: red;
    color: #fff;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    margin: 10px 0;
  }
}
.putong {
  width: 100%;
  overflow: hidden;
}
.title {
  width: 100%;
  overflow: hidden;
  font-weight: bold;
  font-size: 24px;
  padding: 10px;
  box-sizing: border-box;
}
.xia {
  width: 100%;
  text-align: left;
  .bao {
    font-size: 16px;
    color: #afafaf;
    margin: 0 10px;
    margin-bottom: 10px;
    display: inline-block;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
.nr {
  width: 100%;
  overflow: hidden;
  font-weight: normal;
  font-size: 16px;
  padding: 10px;
  line-height: 30px;
}
.he {
  width: 100%;
  height: 80px;
  padding: 20px 0;
  box-sizing: border-box;
  .zan {
    width: 100px;
    height: 30px;
    border: 1px solid #333;
    text-align: center;
    border-radius: 15px;
    float: left;
    font-size: 15px;
    margin: 0 50px;
    line-height: 30px;
    .icondianzan {
      font-size: 20px;
      margin: 0 10px;
      vertical-align: middle;
    }
    .iconweixin {
      font-size: 22px;
      margin: 0 10px;
      vertical-align: middle;
      color: rgb(17, 182, 19);
    }
  }
  .zan1 {
    width: 100px;
    height: 30px;
    border: 1px solid #333;
    text-align: center;
    border-radius: 15px;
    float: left;
    font-size: 15px;
    margin: 0 50px;
    line-height: 30px;
    .icondianzan {
      font-size: 20px;
      margin: 0 10px;
      color: rgb(17, 182, 19);
      vertical-align: middle;
    }
    .iconweixin {
      font-size: 22px;
      margin: 0 10px;
      vertical-align: middle;
      color: rgb(17, 182, 19);
    }
  }
}
.heng {
  width: 100%;
  height: 5px;
  background-color: #d8d5d5;
}
.shipin {
  width: 100%;
  overflow: hidden;
  .coverWrapper {
    width: 100%;
    height: 180px;
    text-align: center;
    position: relative;
    .coverImg {
      width: 100%;
      height: 180px;
      float: left;
    }
    .iconshipin {
      width: 50px;
      height: 50px;
      background-color: #d3d3d3;
      color: #fff;
      font-size: 50px;
      border-radius: 25px;
      position: absolute;
      top: 60px;
      left: 160px;
      text-align: center;
      line-height: 50px;
    }
  }
  video {
    width: 100%;
    overflow: hidden;
  }
  .xia {
    width: 100%;
    height: 50px;
    .bao {
      font-size: 16px;
      color: #afafaf;
      margin: 0 10px;
      margin-top: 15px;
      float: left;
    }
    .gz {
      width: 80px;
      height: 26px;
      text-align: center;
      border: 1px solid rgb(180, 180, 180);
      border-radius: 13px;
      line-height: 26px;
      box-sizing: border-box;
      float: right;
      font-size: 15px;
      margin: 12px 0;
    }
  }
  .title {
    width: 100%;
    overflow: hidden;
    font-size: 20px;
    font-weight: normal;
    padding: 10px;
    box-sizing: border-box;
  }
  .he {
    width: 100%;
    height: 80px;
    padding: 20px 0;
    box-sizing: border-box;
    .zan {
      width: 100px;
      height: 30px;
      border: 1px solid #333;
      text-align: center;
      border-radius: 15px;
      float: left;
      margin: 0 50px;
      font-size: 15px;
      line-height: 30px;
      .icondianzan {
        font-size: 20px;
        margin: 0 10px;
        vertical-align: middle;
      }
      .iconweixin {
        font-size: 22px;
        margin: 0 10px;
        color: rgb(17, 182, 19);
        vertical-align: middle;
      }
    }
  }
}
</style>