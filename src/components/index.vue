<template>
  <div class="index-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src='musicUrl'
             autoplay
             controls></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {

  },
  mixins: [],
  props: {

  },
  data: function () {
    return {
      musicUrl: ''
    }
  },
  created: function () {

  },
  mounted: function () {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
