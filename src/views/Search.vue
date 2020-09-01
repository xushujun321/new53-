<template>
  <div id="app">
    <div class="header1"></div>
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <div class="searchWrapper">
        <span class="iconfont iconsearch"></span>
        <input type="text" v-model="txt" placeholder="通灵兽消失数" />
      </div>
      <div class="btn" @click="searchwz">搜索</div>
      <!-- 出现的下拉列表 -->
      <ul id="ul">
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="read(item.id,item.title)"
        >{{item.title}}</li>
      </ul>
    </div>
    <!-- 点击搜索之后，显示文章详细内容 -->
    <div v-if="show">
      <div class="putong" v-if="list2[0].type==1">
        <span class="iconfont iconjiantou2" @click="yin" style="display: inline-block;"></span>
        <div class="title">{{list2[0].title}}</div>
        <div class="nr" v-html="list2[0].content"></div>
      </div>
      <div class="shipin" v-if="list2[0].type==2">
        <video
          src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
          controls
        ></video>
        <span class="iconfont iconjiantou2" @click="yin" style="display: inline-block;"></span>
        <div class="title">{{list2[0].title}}</div>
      </div>
    </div>
    <div v-else>
      <div class="suggestions">
        <h2>历史记录</h2>
        <div class="list" v-for="(item,index) in histon" :key="index">
          <div class="item" @click="lishi(item)">{{item}}</div>
        </div>
      </div>
      <div class="suggestions">
        <h2>热门搜索</h2>
        <div class="list">
          <div class="item1">办公室小野否认解散</div>
          <div class="item1">月季如何嫁接</div>
          <div class="item1">办公室小野否认解散</div>
          <div class="item1">月季如何嫁接</div>
          <div class="item1">办公室小野否认解散</div>
          <div class="item1">月季如何嫁接</div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      txt: '',
      list: [],
      histon: [],
      id: '',
      show: false,
      wz: [],
      list2: []
    }
  },
  methods: {
    lishi(item) {
      this.txt = item
      this.searchwz()
    },
    yin() {
      this.show = false
    },
    searchwz() {
      // 搜索文章
      // 接口类型:【GET】
      // 接口地址:/post_search
      this.$axios({
        method: 'get',
        url: '/post_search_recommend',
        params: {
          keyword: this.txt
        }
      })
        .then((res) => {
          console.log(res)
          this.list2 = res.data.data
          this.show = true

          //添加历史记录
          if (this.histon.indexOf(this.txt) == -1) {
            this.histon.push(this.txt)
          }
          // localStorage.setItem('history', this.histon)
          // this.histon = localStorage.getItem('history')
          //清楚文本框
          this.txt = ''
          //清楚推荐的内容
          this.list = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    read(id, title) {
      this.id = id
      this.txt = title
      this.list = ''
    }
  },
  watch: {
    //数据听历史记录数组的变化,一旦有变化就要放入本地储存 localSttorage 里面,
    //记得先转换为字符串
    histon() {
      let history = JSON.stringify(this.histon)
      localStorage.setItem('history', history)
    },
    txt() {
      if (this.txt != '') {
        // 搜索推荐
        // 接口类型:【GET】
        // 接口地址: /post_search_recommend
        this.$axios({
          method: 'get',
          url: '/post_search_recommend',
          params: {
            keyword: this.txt
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.data.length != 0) {
              this.list = res.data.data
            } else {
              this.list = ['搜索无结果']
            }
            console.log(this.list)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.list = ''
      }
    }
  },
  created() {
    if (localStorage.getItem('history')) {
      this.histon = JSON.parse(localStorage.getItem('history'))
    }
  }
}
</script>

<style scoped  lang="less">
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
#app {
  background-color: #f1f1f1;
}
.header1 {
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
.HomeTopNav {
  display: flex;
  background-color: red;
  color: #fff;
  align-items: center;
  padding: 0 10/360 * 100vw;
  .iconnew {
    font-size: 54/360 * 100vw;
  }
  .searchWrapper {
    flex: 1;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    height: 34/360 * 100vw;
    line-height: 34/360 * 100vw;
    margin: 0 12/360 * 100vw;
    border-radius: 18/360 * 100vw;
  }
  .iconwode {
    font-size: 32/360 * 100vw;
    opacity: 0.6;
  }
}

.header {
  display: flex;
  align-items: center;
  padding: 14/360 * 100vw;
  position: relative;
  .searchWrapper {
    flex: 1;
    border: 1px solid #888;
    height: 38/360 * 100vw;
    display: flex;
    align-items: center;
    margin: 0 12/360 * 100vw;
    padding: 0 20/360 * 100vw;
    border-radius: 20/360 * 100vw;
    input {
      width: 90%;
      border: none;
      outline: none;
      background-color: #f1f1f1;
    }
  }
  #ul {
    width: 235/360 * 100vw;
    overflow: hidden;
    background-color: #fff;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    top: 54/360 * 100vw;
    left: 55/360 * 100vw;
    li {
      height: 30/360 * 100vw;
      line-height: 30/360 * 100vw;
      border-bottom: 1px solid #f1f1f1;
      padding-left: 8/360 * 100vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.suggestions {
  padding: 20/360 * 100vw;

  h2 {
    font-size: 16/360 * 100vw;
    margin-bottom: 20/360 * 100vw;
  }
  .list {
    display: flex;
    // height: 40/360 * 100vw;
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;
    .item {
      margin: 4/360 * 100vw;
      padding: 4/360 * 100vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .item1 {
      margin: 4/360 * 100vw;
      padding: 4/360 * 100vw;
      &:nth-child(2n-1) {
        margin-right: 40/360 * 100vw;
      }
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