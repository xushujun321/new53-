<template>
  <div id="app">
    <ul class="pin_nr">
      <li>
        <div class="top2">
          {{num+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{getpost.user.nickname}}&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <span>2小时前</span>&nbsp;&nbsp;&nbsp;
          <span @click="huifu(getpost.id,getpost.user.nickname)">回复</span>
        </div>
        <div class="nr1" v-html="getpost.content"></div>
        <xuanran
          :getpost="getpost.parent"
          v-if="getpost.parent"
          :num="num+1"
          :parent_id="getpost.id"
          :name="getpost.user.nickname"
        ></xuanran>
      </li>
    </ul>
    <!-- 自己的评论加上别人的回复 -->
  </div>
</template>

<script>
//引进公共传值
import bus from '@/components/Bus'
export default {
  name: 'xuanran',
  props: ['getpost'],
  data() {
    return {
      num: 0,
      parent_id: '',
      name: '',
      show5: false
    }
  },
  methods: {
    huifu(id, name) {
      this.parent_id = id
      this.name = name
      console.log(this.parent_id, this.name)
      bus.$emit('click', {
        parent_id: this.parent_id,
        name: this.name
      })
    }
  }
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