<template>
  <li>
    <div class="li_left">{{left}}</div>
    <div class="li_right">
      {{right}}
      <span class="iconfont iconjiantou1" @click="href"></span>
    </div>
  </li>
</template>

<script>
//引进公共vue
import bus from '../components/eventBus'
export default {
  props: ['left', 'right'],
  data() {
    return {}
  },
  methods: {
    href() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="less">
li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid rgb(224, 219, 219);
  box-sizing: border-box;
  .li_left {
    float: left;
  }
  .li_right {
    padding-right: 30px;
    float: right;
    color: #c2bcbc;
    position: relative;
    .iconjiantou1 {
      font-size: 20px;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
}
</style>