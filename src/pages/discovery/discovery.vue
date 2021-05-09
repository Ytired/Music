<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class=""
                 :interval="4000"
                 type="card">
      <el-carousel-item v-for="(item, index) in banner"
                        :key="index">
        <img :src="item.imageUrl"
             alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h2 class="title">
        推荐歌单
      </h2>
      <div class="items">
        <div class="item"
             v-for="(item, index) in list"
             :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl"
                 alt="" />
            <span class="iconfont icon-play"
                  @click="toPlaylist(item.id)"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h2 class="title">
        最新音乐
      </h2>
      <div class="items">
        <div class="item"
             v-for="(item, index) in newSongList"
             :key="index">
          <div class="img-wrap"
               @click="playMuisc(item.id)">
            <img :src="item.picUrl"
                 alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h2 class="title">推荐MV</h2>
      <div class="items">
        <div class="item"
             v-for="(item, index) in mvList"
             :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl"
                 alt="" />
            <span class="iconfont icon-play"
                  @click="toMv(item.id)"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistNamem }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'discovery',
  components: {},
  mixins: [],
  props: {},
  data: function () {
    return {
      banner: [],
      list: [],
      newSongList: [],
      mvList: [],
    }
  },
  created: function () {
    //请求banner图片
    this.$axios({
      url: 'https://autumnfish.cn/banner',
      methods: 'get',
    }).then((res) => {
      this.banner = res.data.banners
    })
    //请求推荐歌单内容
    this.$axios({
      url: 'https://autumnfish.cn/personalized',
      methods: 'get',
      params: {
        //获取的数据量
        limit: 15,
      },
    }).then((res) => {
      this.list = res.data.result
    })
    //请求推荐最新音乐
    this.$axios({
      url: 'https://autumnfish.cn/personalized/newsong',
      methods: 'get',
      params: {
        limit: 15,
      },
    }).then((res) => {
      this.newSongList = res.data.result
    })
    //请求MV
    this.$axios({
      url: 'https://autumnfish.cn/personalized/mv',
      methods: 'get',
    }).then((res) => {
      this.mvList = res.data.result
    })
  },
  mounted: function () { },
  computed: {},
  methods: {
    playMuisc(id) {
      this.$axios({
        url: 'https://autumnfish.cn/song/url',
        methods: 'get',
        params: {
          id: id,
        },
      }).then((res) => {
        let url = res.data.data[0].url
        //将值传给父组件  把播放地址给父组件
        this.$parent.musicUrl = url
      })
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  },
}
</script>

<style scoped>
.discovery-container .news .items .item {
  width: 33.3%;
}
</style>
