<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playList.coverImgUrl"
             alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playList.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- 不加v-if="playlist.creator !== undefined" 报错 -->
          <img class="avatar"
               v-if="playList.creator !== undefined"
               :src="playList.creator.avatarUrl"
               alt="" />
          <!-- 名字 -->
          <span class="name"
                v-if="playList.creator !== undefined">
            {{ playList.creator.nickname }}
          </span>
          <!-- 时间 -->
          <span class="time">{{ playList.createTime | dateFMT }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playList.tags"
                :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playList.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表"
                   name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item, index) in playList.tracks"
                :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap"
                     @click="playMusic(item.id, item.name)">
                  <img :src="item.al.picUrl+'?param=130y130'"
                       alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mv !== 0"
                          class="iconfont icon-mv"
                          @click="toMv(item.mv)"></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | dateFMT2 }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`"
                   name="2">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from 'moment'
import { songListDetails, playMusic, getTopComments } from 'service/request'
export default {
  name: 'playlist',
  data() {
    return {
      id: '',
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      pageSize: 10,
      // 歌单详情数据
      playList: {},
      // 热门评论
      hotComments: [],
      // 评论
      comments: []
    };
  },
  created() {
    this.id = this.$route.query.id
    this._songListDetails()
    this._getTopComments()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this._getTopComments()
      console.log(`当前页: ${val}`);
    },
    //请求歌单详情1
    _songListDetails() {
      songListDetails({
        id: this.id
      }).then(res => {
        this.playList = res.playlist
        // console.log(this.playList);
      })
    },
    // 歌单评论
    _getTopComments() {
      getTopComments({
        id: this.id,
        limit: this.pageSize,
        offset: (this.page - 1) * this.pageSize
      }).then(res => {
        this.comments = res.comments
        this.hotComments = res.hotComments
        this.total = res.total
      })
    },
    // 点击播放
    playMusic(id, name) {
      console.log(id);
      playMusic({
        id
      }).then(res => {
        let url = res.data[0].url
        //将值传给父组件  把播放地址给父组件
        this.$parent.musicUrl = url
        this.$notify({
          title: '开始播放：' + name,
          offset: 50,
          //成功
          type: 'success',
          //不自动关闭
          duration: 4000
        })
      })
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
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
.play-wrap {
  cursor: pointer;
}
</style>
