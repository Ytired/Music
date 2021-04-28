<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item"
            :class="{ active: index == checkIndex }"
            @click="toggle(item, index)"
            v-for="(item, index) in tagLists"
            :key="index">
        {{ item }}
      </span>
    </div>
    <!-- 底部的table -->
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
            v-for="(item, index) in songLists"
            :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <!-- 点击播放按钮 -->
            <div class="img-wrap"
                 @click="playMusic(item.id, item.name, false)">
              <img :src="item.album.picUrl"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{ item.album.company }}</span>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | dateFMT }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 分页器 
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change  页码改变事件
    -->
    <el-pagination @size-change="sizeChange"
                   @current-change="currentPageChange"
                   background
                   layout="prev, pager, next"
                   :total="100"
                   :current-page="queryInfo.offset"
                   :page-size="queryInfo.limit">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
import {getBanner} from 'service/request.js'
export default {
  name: 'songs',
  data() {
    return {
      //当前选择的活跃标签
      checkIndex: 0,
      songLists: [],
      list: [],
      tag: '',
      tagLists: ['全部', '华语', '欧美', '日本', '韩国'],
      queryInfo: {
        limit: 20,
        offset: 1,
      },
    }
  },
  created() {
    //调用最新音乐
    this.newMusic()
    this.getBanner()
  },
  methods: {
    //创建最新音乐网络请求
    newMusic(type) {
      this.$axios({
        url: 'https://autumnfish.cn/top/song/',
        method: 'get',
        params: {
          type: type,
          limit: 15,
        },
      }).then((res) => {
        // console.log(res)
        this.songLists = res.data.data.slice(0, 50)
        if (res.data.code == 200) {
          this.list = [...res.data.data]
          // console.log(this.list)
          this.songLists = this.list.slice(0, this.queryInfo.limit)
        }
      })
    },
    // 页码
    sizeChange(newSize) {
      console.log(newSize);

      this.queryInfo.limit = newSize
      console.log(`我是limit数据${this.queryInfo.limit}`);

      let start = (this.queryInfo.offset - 1) * this.queryInfo.limit
      let end = (this.queryInfo.offset - 1) * this.queryInfo.limit + this.queryInfo.limit
      this.songLists = this.list.slice(start, end)
    },
    // 页码发生变化
    currentPageChange(newPage) {
      this.queryInfo.offset = newPage

      let start = (this.queryInfo.offset - 1) * this.queryInfo.limit
      let end = (this.queryInfo.offset - 1) * this.queryInfo.limit + this.queryInfo.limit
      this.songLists = this.list.slice(start, end)
      console.log('this.list.splice(start, end): ', this.list.slice(15, 30))
    },
    //toggle点击事件
    toggle(item, index) {
      // console.log(item)
      // console.log(index);
      this.checkIndex = index
      this.queryInfo.offset = 1
      // 点到谁谁就传入对应的值
      if (index == 0) {
        this.newMusic(0)
      } else if (index == 1) {
        this.newMusic(7)
      } else if (index == 2) {
        this.newMusic(96)
      } else if (index == 3) {
        this.newMusic(8)
      } else if (index == 4) {
        this.newMusic(16)
      }
    },
    // 播放音乐
    playMusic(id, name, insert = ture) {
      this.$axios({
        url: 'https://autumnfish.cn/song/url',
        methods: 'get',
        params: {
          id: id,
        },
      }).then((res) => {
        let url = res.data.data[0].url
        // console.log(this.$parent.musicUrl);
        //将值传给父组件  把播放地址给父组件
        this.$parent.musicUrl = url
        this.$notify({
          title: '开始播放：' + name,
          offset: 50,
          //成功
          type: 'success',
          //不自动关闭
          duration: 0
        })
      })
    },
    getBanner(){
      getBanner().then(res => {
        console.log(res);
    })
  }
  },
  filters: {
    dateFMT(str) {
      return moment(str).format('mm:ss')
    },
  },
}
</script>

<style >
</style>
