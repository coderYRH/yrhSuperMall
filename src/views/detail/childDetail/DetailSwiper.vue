<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" @load="imageLoad" />
    </swiper-item>
  </swiper>
</template>


<script>
import { Swiper, SwiperItem } from "common/swiper/index";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // isLoad: false,
    };
  },

  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      // if (!this.isLoad) {
      //   this.$emit("detailSwiperImageLoad");
      //   this.isLoad = true;
      // }

      // this.$bus.$emit("detailSwiperImageLoad");
      this.$bus.$emit("imageLoadItem");
    },
  },
};
</script>


<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>