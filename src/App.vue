<template>
  <div id="app">
    <div class="container">
      <!-- LOGO -->
      <a :href="index" class="logo" ref="logo">
        <img :src="logo">
      </a>

      <!-- 搜索引擎选择 -->
      <div class="engines">
        <div
          class="li"
          v-for="item in Object.keys(json)"
          :key="json[item].label"
          :class="{active: active === item}"
          @click="active = item">
          {{json[item].label}}
          </div>
      </div>

      <!-- 输入框 -->
      <div class="input">
        <input type="text" v-model="q" @keyup.enter="submit">
        <div class="submit" @click="submit">搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'google',
      q: '',
      index: 'https://www.google.com',
      logo: '/logo/google.png',
      json: [
        google: {
          logo: '/logo/google.png',
          label: 'google',
          // 首页
          index: 'https://www.google.com',
          // 搜索页
          url: 'https://www.google.com/search',
          // 提交参数
          q: 'q'
        },
        baidu: {
          logo: '/logo/baidu.jpg',
          label: '百度',
          index: 'https://www.baidu.com/',
          url: 'https://www.baidu.com/s',
          q: 'wd'
        },
        github: {
          logo: '/logo/github.png',
          label: 'GitHub',
          index: 'https://github.com/',
          url: 'https://github.com/search',
          q: 'q'
        },
        npm: {
          logo: '/logo/npm.jpg',
          label: 'npm',
          index: 'https://www.npmjs.com/',
          url: 'https://www.npmjs.com/search',
          q: 'q'
        },
        bing: {
          logo: '/logo/bing.jpg',
          label: 'bing',
          index: 'https://cn.bing.com/',
          url: 'https://cn.bing.com/search',
          q: 'q'
        }]
    }
  },
  watch: {
    active (newV, oldV) {
      this.logoAnimation()
    }
  },
  methods: {
    Object,
    // 搜索提交
    submit () {
      if (!this.q) return

      let url = `${this.json[this.active].url}?${this.json[this.active].q}=${this.q}`
      window.location.href = url
    },
    // logo 切换动画
    async logoAnimation () {
      // 入场
      await this.anime({
        targets: this.$refs.logo,
        opacity: 0,
        translateY: -20,
        duration: 300
      }).finished

      // 修改 logo 图片和 URL
      this.index = this.json[this.active].index
      this.logo = this.json[this.active].logo

      // 离场
      this.anime({
        targets: this.$refs.logo,
        opacity: 1,
        translateY: 0,
        duration: 300
      }).finished
    },
    created () {
      this.active = window.localStorege.getItem('active') || this.json[0].label || null
    }
  }
}
</script>

<style lang="stylus">
$color = #000

#app
  margin-top 100px
  color #000
  font-size 16px
  font-weight 600
  .container
    width 560px
    margin 0 auto
    // LOGO
    .logo
      display block
      text-align center
      img
        height 150px
    // 搜索引擎选择
    .engines
      margin-top 30px
      .li
        display inline-block
        background-color #fff
        padding 10px 20px
        cursor pointer
        transition background-color .3s
        &:hover
          color #fff
          background-color $color
        &.active
          color #fff
          background-color $color
    // 输入框
    .input
      position relative
      padding-right 93px
      input
        outline none
        border 1px solid $color
        font-size 18px
        width 100%
        height 39px
        padding 0 10px
      .submit
        position absolute
        right 0
        top 0
        color #fff
        padding 10px 20px
        background-color $color
        cursor pointer
        transition background-color .3s
        &:hover
          background-color $color + 20%
// 图片过渡
.img-enter,
.img-leave-to
  opacity 0
.img-enter-active,
.img-leave-active
  transition opacity .3s
</style>
