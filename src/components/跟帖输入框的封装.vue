<template>
  <div id="app">
    <!-- 不进行评论，也不进行写帖 -->
    <div class="pinl" v-show="!show">
      <input type="text" id="gentie" placeholder="写跟帖" @focus="shows" :value="html1" />
      <div class="xinxi">
        <span class="iconfont iconpinglun-"></span>
        <div class="shu">102</div>
      </div>
      <span class="iconfont iconshoucang" v-show="!show5" @click="collect"></span>
      <span class="iconfont iconshoucang yisc" v-show="show5" @click="collect"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 回复信息 -->
    <div class="pinl" v-show="show">
      <textarea
        id="gentie2"
        cols="30"
        rows="20"
        ref="write"
        :placeholder="'回复：@'+name2"
        @blur="show2"
        v-model="html1"
      ></textarea>
      <!-- <input type="text" id="gentie2" placeholder="回复：@火星网友1" /> -->
      <span class="huifu1" @click="huifu3">回复</span>
    </div>
  </div>
</template>

<script>
//引进公共传值
import bus from '@/components/Bus'
export default {
  // props: ['name2', 'parent_id'],
  data() {
    return {
      html1: '',
      name: '',
      show: false,
      show5: false,
      name2: '',
      parent_id: ''
    }
  },
  methods: {
    shows() {
      this.show = true
      setTimeout(() => {
        this.$refs.write.focus()
        // this.parent_id = ''
      }, 200)
    },
    show2() {
      // this.$emit('blur')

      setTimeout(() => {
        this.show = false
      }, 200)
    },
    collect() {
      // 收藏文章
      // 接口类型:【GET】
      // 需要验证:【Authorization 】
      // 接口地址: /post_star/:id
      this.$axios({
        method: 'get',
        url: '/post_star/' + this.$route.params.id
      })
        .then((res) => {
          console.log(res)
          this.show5 = !this.show5
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //点击发送
    huifu3() {
      console.log(this.$route.params.id)
      console.log(this.html1)
      // 发布评论
      // 接口类型:【POST】
      // 需要验证:【Authorization 】
      // 接口地址: /post_comment/:id
      this.$axios({
        method: 'post',
        url: '/post_comment/' + this.$route.params.id,
        data: {
          content: this.html1,
          parent_id: this.parent_id
        }
      })
        .then((res) => {
          console.log(res)
          this.html1 = ''
          this.parent_id = ''
          //发送给父组件
          this.$emit('reload')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    bus.$on('click', (data) => {
      this.name2 = data.name
      this.parent_id = data.parent_id
      //弹起输入框
      this.shows()
    })
    bus.$on('replay', (data) => {
      this.parent_id = data
      console.log(data)
      //弹起输入框
      this.shows()
    })
  }
}
</script>

<style scoped  lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
.pinl {
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  #gentie {
    display: inline-block;
    flex: 1;
    border: none;
    background-color: rgb(215, 215, 215);
    height: 30px;
    border-radius: 15px;
    padding-left: 10px;
    font-size: 16px;
    margin: 0px 165px 0px 0;
  }
  .xinxi {
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    position: absolute;
    top: 22px;
    right: 135px;
    .iconpinglun- {
      font-size: 28px;
    }
    .shu {
      width: 30px;
      height: 13px;
      text-align: center;
      line-height: 13px;
      background-color: red;
      color: #fff;
      font-size: 10px;
      border-radius: 5px;
      position: absolute;
      top: -3px;
      right: -11px;
    }
  }
  .iconshoucang {
    font-size: 28px;
    position: absolute;
    top: 18px;
    right: 75px;
  }
  .yisc {
    color: red;
  }
  .iconfenxiang {
    font-size: 28px;
    position: absolute;
    top: 20px;
    right: 25px;
  }
}
.pinl {
  width: 100%;
  padding: 20px 10px 0;
  overflow: hidden;
  display: flex;
  position: relative;
  #gentie2 {
    display: inline-block;
    flex: 1;
    border: none;
    background-color: rgb(215, 215, 215);
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 16px;
    height: 100px;
    vertical-align: bottom;
    margin: 0 110px 0 0;
    resize: none;
    color: #838383;
  }
  .huifu1 {
    width: 65px;
    height: 30px;
    background-color: red;
    color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    border-radius: 15px;
    position: absolute;
    bottom: 0px;
    right: 40px;
  }
}
</style>