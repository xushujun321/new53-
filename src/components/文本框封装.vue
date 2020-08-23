<template>
  <div class="box">
    <input
      :type="type"
      class="txt"
      v-bind="$attrs"
      :value="value"
      @input="headle"
      @change="heserr"
      :class="{'right':isOK,'error':!isOK,'empty':!value}"
    />
    <button class="ss" v-if="hasSearch=='search'">搜索</button>
  </div>
</template>

<script>
export default {
  //为了防止父组件传过来的值，在没有设置接口的时候，被最大的盒子截取
  inheritAttrs: false,
  props: [
    'hasSearch', //文本框按钮的显示和隐藏search  none
    'value',
    'rules',
    'err_msg',
    'type'
  ],
  data() {
    return {
      isOK: ''
    }
  },
  methods: {
    headle(e) {
      // console.log(e.target.value)
      let v = e.target.value
      this.$emit('input', v)
      if (this.rules) {
        if (this.rules.test(v)) {
          this.isOK = true
        } else {
          this.isOK = false
        }
      }
    },
    heserr() {
      if (this.rules && !this.isOK && this.err_msg) {
        alert(this.err_msg)
      } else if (!this.isOK) {
        alert('输入数据不正确')
      }
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  display: flex;
}
input {
  flex: 1;
  font-size: 5vw;
  line-height: 16.667vw;
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  width: 100%;
  background-color: #f1f1f1;
}
.right {
  border-bottom: 1px solid rgb(54, 149, 16);
}
.error {
  border-bottom: 1px solid rgb(211, 20, 20);
}
.empty {
  border-bottom: 1px solid rgb(42, 41, 41);
}
button {
  width: 50px;
  height: 30px;
  float: right;
}
</style>