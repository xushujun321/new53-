<template>
  <div>
    <input
      type="button"
      class="btn"
      :value="value"
      @click="dian"
      :class="{'blue':type==='blue','yellow':type==='yellow','green':type==='green','fang':round==='fang','yuan':round==='yuan'}"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    type: String,
    round: String,
    text: {
      type: String,
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {
    dian(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.btn {
  width: 88.333vw;
  height: 13.333vw;
  line-height: 13.333vw;
  background-color: #cc3300;
  color: white;
  font-size: 5vw;
  border: none;
  border-radius: 6.667vw;
  margin-right: 25px;
}
.blue {
  background-color: #1f7292;
}
.yellow {
  background-color: #ccc01c;
}
.green {
  background-color: #24810c;
}
.fang {
  border-radius: 0vw;
}
.yuan {
  border-radius: 6.667vw;
}
</style>