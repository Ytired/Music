<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="topList.coverImgUrl"
             alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ topList.name }}
        </div>
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <img :src="topList.coverImgUrl"
           alt=""
           class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item"
              :class="{ active: index == checkIndex }"
              @click="toggle(index, item)"
              v-for="(item, index) in tagLists"
              :key="index">
          {{ item }}
        </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item"
               v-for="(item, index) in songList"
               :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change  页码改变事件
    -->
    <el-pagination @current-change="handleCurrentChange"
                   background
                   layout="prev, pager, next"
                   :total="total"
                   :current-page="page"
                   :page-size="15">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'playLists',
  components: {},
  mixins: [],
  props: {},
  data: function () {
    return {
      //当前选择的活跃标签
      checkIndex: 0,
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //顶部推荐歌单
      topList: {},
      //歌单列表
      songList: [],
      //标签列表
      tagLists: [
        '全部',
        '欧美',
        '华语',
        '流行',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        'ACG',
        '怀旧',
        '治愈',
        '旅行',
      ],
    }
  },
  watch: {},
  created: function () {
    //顶部的精品歌单
    this.topData()
    // this.$axios({
    //   url: 'https://autumnfish.cn/top/playlist/highquality',
    //   methods: 'get',
    //   params: {
    //     limit: 1,
    //     cat: '全部',
    //   },
    // }).then((res) => {
    //   // console.log(res);
    //   this.topList = res.data.playlists[0]
    // })
    // 歌单列表数据
    this.listData()
    // this.$axios({
    //   url: 'https://autumnfish.cn/top/playlist',
    //   methods: 'get',
    //   params: {
    //     limit: 15,
    //     cat: '全部',
    //     offset: 0,
    //   },
    // }).then((res) => {
    //   // console.log(res)
    //   this.songList = res.data.playlists
    // })
  },
  mounted: function () { },
  computed: {},
  methods: {
    toggle(index, item) {
      this.page = 1
      // console.log(item)
      this.checkIndex = index
      // 点击切换歌单列表数据
      this.topData(item)
      //点击切换顶部的精品歌单
      this.listData(item)
    },
    // 列表数据
    listData(item) {
      this.$axios({
        url: 'https://autumnfish.cn/top/playlist/',
        methods: 'get',
        params: {
          limit: 15,
          cat: item,
          //分页： 每一页的数据减去1乘limit的数据  就是当前页的数据
          offset: (this.page - 1) * 15,
        },
      }).then((res) => {
        // console.log(res)
        //保存分页的总条数数据
        this.total = res.data.total
        this.songList = res.data.playlists
      })
    },
    // 顶部数据
    topData(item) {
      this.$axios({
        url: 'https://autumnfish.cn/top/playlist/highquality',
        methods: 'get',
        params: {
          limit: 1,
          cat: item,
        },
      }).then((res) => {
        // console.log(res);
        this.topList = res.data.playlists[0]
      })
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.page = val
      // 重新请求数据
      this.listData()
      console.log(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped>
</style>
