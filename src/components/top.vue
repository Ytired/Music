<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input type="text"
               autocomplete="off"
               placeholder="搜索"
               class="el-input__inner"
               v-model="inputValue"
               @keyup.enter="toResult" />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  components: {

  },
  mixins: [],
  props: {
  },
  data() {
    return {
      // 输入框的内容
      inputValue: ''
    }
  },
  created() { },
  mounted() { },
  methods: {
    toResult() {
      // 判断是否为空
      if (this.inputValue == '') {
        // 提示用户
        this.$notify({
          title: '请输入要查询的歌名',
          offset: 50,
          //警告
          type: 'warning',
          //不自动关闭
          duration: 4000
        })
      } else {
        // 去搜索页并携带数据
        this.$router.push('/result?q=' + this.inputValue)
      }
    },
  }
}
</script>

<style scoped>
.right-box {
  position: relative;
  left: -6%;
  margin: auto;
}
</style>
