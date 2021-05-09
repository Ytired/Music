<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:area=='全部'}"
                  @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='内地'}"
                  @click="area='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='港台'}"
                  @click="area='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='欧美'}"
                  @click="area='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='日本'}"
                  @click="area='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='韩国'}"
                  @click="area='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <!-- 分类切换 类型 -->
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:type=='全部'}"
                  @click="type='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='官方版'}"
                  @click="type='官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='原声'}"
                  @click="type='原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='现场版'}"
                  @click="type='现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='网易出品'}"
                  @click="type='网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <!-- 分类切换 排序 -->
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:order=='上升最快'}"
                  @click="order='上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:order=='最热'}"
                  @click="order='最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:order=='最新'}"
                  @click="order='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item"
             v-for="(item, index) in lists"
             :key="index"
             @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.cover"
                 alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :current-page="page"
                     :page-size="8">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMvs } from "service/request.js"
export default {
  name: 'mvs',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 类型
      order: "上升最快",
      // 获取到的结果
      lists: []
    };
  },
  // 侦听器
  watch: {
    area() {
      this.page = 1
      // 获取数据
      this._getMVs()
    },
    type() {
      this.page = 1
      // 获取数据
      this._getMVs()
    },
    order() {
      this.page = 1
      // 获取数据
      this._getMVs()
    }
  },
  created() {
    this._getMVs()
    console.log(this._getMVs());
  },
  // 过滤器
  filters: {
    // 省略播放量
    ellipsisPlayVolume(val) {
      // 大于十万的显示 xx万
      if (val < 100000) return val
      return parseInt(val / 10000) + '万'
    },
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    // 页码改变
    handleCurrentChange(val) {
      // 保存页码
      this.page = val
      // 重新请求数据
      this._getMVs()
      console.log(`当前页: ${val}`);
    },
    _getMVs() {
      getMvs({
        // 歌曲地区
        area: this.area,
        // 歌曲类型
        type: this.type,
        // 歌曲排序
        order: this.order,
        // 页面容量
        limit: this.limit,
        // 分页 相当于页码
        offset: (this.page - 1) * this.limit
      })
        .then(res => {
          console.log(res);
          this.lists = res.data
          // 保存总条数
          if (res.count) {
            this.total = res.count
          }
        })
    },
  }
};
</script>

<style >
</style>
