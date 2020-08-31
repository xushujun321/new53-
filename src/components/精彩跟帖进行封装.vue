<template>
  <div id="app">
    <div class="jing_top">精彩跟帖</div>

    <!-- 没有任何评论的时候 -->
    <div class="wu" v-if="list.length==0">暂无跟帖，抢占沙发</div>

    <!-- 自己的评论加上别人的回复 -->
    <div class="nohave" v-if="list.length>0">
      <!-- 有网友评价自己 -->
      <div class="have" v-for="(item,index) in list" :key="index">
        <div class="one">
          <img
            :src="$axios.defaults.baseURL+item.user.head_img"
            v-if="item.user.head_img"
            height="70"
            width="70"
          />
          <img src="../assets/head.png" v-else height="70" width="70" />
          <div class="right">
            <div class="top1">{{item.user.nickname}}</div>
            <div class="bottom1">2小时前</div>
            <span class="quguan" @click="reply(item.id)">回复</span>
          </div>
        </div>
        <!-- 进行判断，是否存在二级 -->
        <div class="other" v-if="item.parent">
          <comment :getpost="item.parent"></comment>
        </div>
        <div class="nr1">{{item.content}}</div>
      </div>
      <div class="more">
        <span>更多跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
//引进跟帖
import comment from '@/components/回复的子组件'

//引进公共传值
import bus from '@/components/Bus'
export default {
  components: {
    comment
  },
  props: ['list'],
  data() {
    return {
      show: false,
      content: '',
      name2: ''
    }
  },
  methods: {
    //点击更多跟帖按钮
    tiao() {
      this.$emit('click')
    },
    reply(parent_id) {
      bus.$emit('replay', parent_id)
    }
  },
  created() {}
}
</script>

<style scoped  lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
.jing_top {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 17px;
}
.nohave {
  width: 100%;
  overflow: hidden;
}
.wu {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 15px;
  color: rgb(133, 133, 133);
  border-bottom: 1px solid #d8d5d5;
}
.have {
  width: 100%;
  overflow: hidden;
  padding: 10px;
  border-bottom: 1px solid #d8d5d5;
  box-sizing: border-box;
}
.one {
  width: 100%;
  height: 85px;
  padding: 25px 0 0px 20px;
  box-sizing: border-box;
  text-align: left;
  display: flex;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.right {
  flex: 1;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  position: relative;
  .top1 {
    // font-weight: bold;
    width: 100%;
  }
  .bottom1 {
    font-size: 15px;
    color: #bdbdbd;
  }
  .quguan {
    display: inline-block;
    width: 90px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 15px;
    background-color: rgb(225, 225, 225);
    border-radius: 15px;
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
.nr1 {
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding: 10px;
  font-size: 15px;
}

.other {
  width: 100%;
  overflow: hidden;
  .pin_nr {
    width: 100%;
    overflow: hidden;
    border: 1px solid #d8d5d5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      width: 100%;
      overflow: hidden;
      padding: 10px;
      border-top: 1px solid #d8d5d5;
      box-sizing: border-box;
      .top2 {
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: relative;
        font-size: 15px;
        span {
          color: rgb(133, 133, 133);
          &:last-child {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
      &:first-child {
        border: none;
      }
    }
  }
}
.more {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  span {
    display: inline-block;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    border: 1px solid rgb(133, 133, 133);
  }
}
</style>