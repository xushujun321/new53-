<template>
  <div id="app">
    <ul class="pin_nr">
      <li>
        <div class="top2">
          {{num+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{getpost.user.nickname}}&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <span>2小时前</span>&nbsp;&nbsp;&nbsp;
          <span>回复</span>
        </div>
        <div class="nr1" v-html="getpost.content"></div>
        <xuanran :getpost="getpost.parent" v-if="getpost.parent" :num="num+1"></xuanran>
      </li>
    </ul>
    <!-- 自己的评论加上别人的回复 -->
  </div>
</template>

<script>
export default {
  name: 'xuanran',
  props: ['getpost'],
  data() {
    return {
      num: 0
    }
  }
  /* methods: {
    shows() {
      this.$emit('focus')
      this.$refs.write.focus()
    }
  } */
}
</script>

<style scoped  lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');

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
</style>