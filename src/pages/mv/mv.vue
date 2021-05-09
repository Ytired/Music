<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls
               :src="mvVideo"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon+'?param=70y70'"
                 alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap"
           v-if="hotComments !== undefined && hotComments.length !== 0">
        <p class="title">
          精彩评论<span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item"
               v-for="(item, index) in hotComments"
               :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'"
                   alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content"
                   v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFMT }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item"
               v-for="(item, index) in comments"
               :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'"
                   alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content"
                   v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFMT }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :current-page="page"
                     :page-size="pageSize">
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item"
               v-for="(item, index) in relevantMvs"
               :key="index">
            <div class="img-wrap">
              <img :src="item.cover"
                   alt="" />
              <span class="iconfont icon-play"
                    @click="playMv(item.id)"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
              </div>
              <span class="time">{{ item.duration | dateFMT2}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getMv, getRelevantMvs, getmvDetails, getArtistIcon, getMvComments } from 'service/request'
export default {
  name: 'mv',
  data() {
    return {
      id: '',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      pageSize: 10,
      // mv视频
      mvVideo: '',
      // 相关mv
      relevantMvs: [],
      mvInfo: {},
      icon: '',
      // 热门评论
      hotComments: [],
      // 评论
      comments: []
    };
  },
  created() {
    this.id = this.$route.query.id
    this._getMV()
    this._getRelevantMvs()
    this._getmvDetails()
    this._getMvComments()
  },
  methods: {
    playMv(id) {
      this.page = 1
      this.id = id
      this._getMV()
      this._getRelevantMvs()
      this._getmvDetails()
      this._getMvComments()
    },
    handleCurrentChange(val) {
      this.page = val
      this._getMvComments()
      console.log(`当前页: ${val}`);
    },
    // mv
    _getMV() {
      getMv({
        id: this.id
      }).then(res => {
        this.mvVideo = res.data.url
      })
    },
    // 相关MV
    _getRelevantMvs() {
      getRelevantMvs({
        mvid: this.id
      }).then(res => {
        this.relevantMvs = res.mvs
      })
    },
    // mv信息
    _getmvDetails() {
      getmvDetails({
        mvid: this.id
      }).then(res => {
        console.log(res);
        this.mvInfo = res.data
        // 获取歌手头像
        getArtistIcon({
          id: this.mvInfo.artists[0].id
        }).then(res1 => {
          this.icon = res1.artist.picUrl
        })
      })
    },
    // mv评论
    _getMvComments() {
      getMvComments({
        id: this.id,
        limit: this.pageSize,
        offset: (this.page - 1) * this.pageSize
      }).then(res => {
        this.comments = res.comments
        this.hotComments = res.hotComments
        this.total = res.total
      })
    }
  },
  filters: {
    dateFMT(str) {
      return moment(str).format('YYYY-M-M HH:mm:ss')
    },
    dateFMT2(str) {
      return moment(str).format('mm:ss')
    },
    // 省略播放量
    ellipsisPlayVolume(val) {
      // 大于十万的显示 xx万
      if (val < 100000) return val
      return parseInt(val / 10000) + '万'
    },
  },
};
</script>

<style scoped>
</style>
