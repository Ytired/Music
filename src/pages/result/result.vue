<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title"
          :keywords="(keywords = this.$route.query.q)">{{ this.$route.query.q }}</h2>
      <span class="sub-title">找到{{ searchResultsNumber }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲"
                   name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item, index) in searhSongsLists"
                :key="index">
              <td>{{ index+1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span>{{ item.name }}</span>
                    <!-- mv的图标 -->
                    <span v-if="item.mvid!=0"
                          class="iconfont icon-mv"
                          @click.stop="toMv(item.mvid)"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length!=0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | dateFMT }}</td>
              <span class="iconfont icon-play "
                    @click="playMusic(item.id, item.name)"></span>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单"
                   name="lists">
        <div class="items">
          <div class="item"
               v-for="(item, index) in songLists"
               :key="index"
               @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap wrap">
                播放量:
                <span class="num">{{ item.playCount | ellipsisPlayVolume }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV"
                   name="mv">
        <div class="items mv">
          <div class="item"
               v-for="(item, index) in mvLists"
               :key="index"
               @click="toMv(item.id)">
            <div class="img-wrap">
              <!-- param=250y150传递大小 -->
              <img :src="item.cover+'?param=250y150'"
                   alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
              </div>
              <span class="time">{{ item.duration | dateFMT }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange"
                   background
                   layout="prev, pager, next"
                   :total="total"
                   :current-page="page"
                   :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
import { searchMusic, playMusic } from 'service/request'
export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',
      // 歌曲搜索结果
      searhSongsLists: [],
      // 歌单搜索结果
      songLists: [],
      // mv搜索结果
      mvLists: [],
      // 搜索结果总数
      searchResultsNumber: '',
      type: 1,
      keywords: '',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      pageSize: 10,
    };
  },
  created() {
    // this._searchMusic()
  },
  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.page = val
      // 重新获取数据
      this._searchMusic()
    },
    // 网络请求
    _searchMusic() {
      let timestamp = new Date().getTime()
      searchMusic({
        timestamp: timestamp,
        keywords: this.keywords,
        type: this.type,
        // 数据量
        limit: this.type === 1004 ? 8 : 10,
        offset: (this.page - 1) * (this.type === 1004 ? 8 : 10)
      }).then(res => {
        if (this.type === 1) {
          this.searhSongsLists = res.result.songs
          this.searchResultsNumber = res.result.songCount
        } else if (this.type === 1000) {
          this.songLists = res.result.playlists
          this.searchResultsNumber = res.result.playlistCount
        } else if (this.type === 1004) {
          this.mvLists = res.result.mvs
          this.searchResultsNumber = res.result.mvCount
        }
        this.total = this.searchResultsNumber
      })
    },
    // 点击播放
    playMusic(id, name) {
      console.log(id);
      playMusic({
        id
      }).then(res => {
        console.log(res.data);
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
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  },
  filters: {
    dateFMT(str) {
      return moment(str).format('mm:ss')
    },
    // 省略播放量
    ellipsisPlayVolume(val) {
      // 大于十万的显示 xx万
      if (val < 100000) return val
      return parseInt(val / 10000) + '万'
    },
  },
  // 侦听器
  watch: {
    keywords() {
      this._searchMusic()
    },
    activeIndex() {
      //songs 歌曲
      //lists 歌单
      //mv mv
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.page = 1
          break;
        case 'lists':
          this.type = 1000
          this.page = 1
          break;
        case 'mv':
          this.type = 1004
          this.page = 1
          break;
        default:
          break;
      }
      this._searchMusic()
    }
  },
};
</script>

<style scoped>
.icon-play {
  font-size: 13px;
  line-height: 43px;
}

.wrap {
  top: -20px !important;
}
.img-wrap:hover .wrap {
  top: 0px !important;
}
</style>
