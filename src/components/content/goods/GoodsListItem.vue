<template>
  <div class="goods">
    <!-- 请求数据是图片就已经加载好 -->
    <!-- <img :src="showImage" alt="" @load="imageLoad" @click="itemClick" /> -->
    <!-- 懒加载图片 -->
    <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick" />

    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>  

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    imageLoad() {
      this.$bus.$emit("imageLoadItem");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
      // let iid = this.goodsItem.iid;
      // this.$router.push({
      //   path: "/detail/params",
      //   query: {
      //     iid,
      //   },
      // });
    },
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img ||
        this.goodsItem.image ||
        this.goodsItem.showLarge.img
      );
    },
  },
};
</script>


<style scoped>
.goods {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods img {
  border-radius: 5px;
  width: 100%;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>