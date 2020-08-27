<template>
  <div id="app">
    <!-- 单图片 -->
    <div id="app">
      <div class="singleImg" v-if="page.type==1&&page.cover.length<3" @click="shijian">
        <div class="left">
          <div class="title">{{page.title}}</div>
          <div class="xia">
            <div class="bao">{{page.user.nickname}}</div>
            <div class="bao">{{page.comment_length}}跟帖</div>
          </div>
        </div>
        <div class="right">
          <img
            :src="page.cover[0].url.split('?')[0]"
            v-if="page.cover[0].url"
            height="90"
            width="100"
          />
        </div>
      </div>
    </div>
    <!-- 多图片 -->
    <div class="multiImg" v-if="page.type==1&&page.cover.length>=3" @click="shijian">
      <div class="title">{{page.title}}</div>
      <div class="imgs">
        <img :src="page.cover[0].url" alt />
        <img :src="page.cover[1].url" alt />
        <img :src="page.cover[2].url" alt />
      </div>
      <div class="xia">
        <div class="bao">{{page.user.nickname}}</div>
        <div class="bao">{{page.comment_length}}跟帖</div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="video" v-if="page.type==2&&page.cover.length>=1" @click="shijian">
      <div class="title">{{page.title}}</div>
      <div class="coverWrapper">
        <img :src="page.cover[0].url" class="coverImg" />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="xia">
        <div class="bao">{{page.user.nickname}}</div>
        <div class="bao">{{page.comment_length}}跟帖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],
  methods: {
    shijian() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped  lang="less">
#app {
  .singleImg {
    width: 100%;
    overflow: hidden;
    display: flex;
    .left {
      flex: 1;
      float: left;
      padding: 10px;
      .xia {
        width: 100%;
        text-align: left;
        .bao {
          font-size: 16px;
          color: #afafaf;
          margin: 0 10px;
          margin-top: 10px;
          display: inline-block;
          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }
    .right {
      width: 100px;
      height: 90px;
      float: right;
    }
  }
  .multiImg {
    width: 100%;
    overflow: hidden;
    .title {
      width: 100%;
      overflow: hidden;
    }
    .imgs {
      width: 100%;
      height: 90px;
      display: flex;
      img {
        flex: 1;
        height: 90px;
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
        margin-bottom: 10px;
        display: inline-block;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
  }
  .video {
    width: 100%;
    overflow: hidden;
    .title {
      width: 100%;
      overflow: hidden;
    }
    .coverWrapper {
      width: 100%;
      height: 150px;
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
    .xia {
      width: 100%;
      text-align: left;
      .bao {
        font-size: 16px;
        color: #afafaf;
        margin: 10px 10px;
        display: inline-block;
        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>