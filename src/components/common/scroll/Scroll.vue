<template>
  <div class="wrappera" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0, //0和1代表不实时监控位置，2代表鼠标按住是监控位置，3代表只要滑动未停止都会监控位置
    },
    pullLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullLoad,
    });

    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    this.scroll.on("pullingUp", () => {
      // console.log("下载跟多");
      this.$emit("pullMore");
    });
  },

  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("*/*/*/*/*/");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>


<style scoped>
</style>