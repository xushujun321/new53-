<template>
  <div class="top">
    {{name1}}
    <span class="iconfont iconjiantou2" @click="submit"></span>
  </div>
</template>

<script>
export default {
  props: ['name1'],
  methods: {
    submit() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  .iconjiantou2 {
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 18px;
  }
}
</style>