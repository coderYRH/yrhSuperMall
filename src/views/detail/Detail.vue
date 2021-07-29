<template>
  <div id="mydetail">
    <detail-nav-bar
      class="detail-nav"
      @itemClick="itemClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll
      class="content"
      ref="scroll"
      @scroll="contenPosition"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        @imageLoad="imageLoad"
        :detail-info="detailInfo"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <detail-recommend-info
        ref="recommend"
        :recommend-list="recommendList"
      ></detail-recommend-info>
      <!-- <goods-list
        
        ref="recommend"
        :goods="recommendList"
      /> -->
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
 
<script>
import DetailNavBar from "views/detail/childDetail/DetailNavBar";
import DetailSwiper from "views/detail/childDetail/DetailSwiper";
import DetailBaseInfo from "views/detail/childDetail/DetailBaseInfo";
import DetailShopInfo from "views/detail/childDetail/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childDetail/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childDetail/DetailParamInfo";
import DetailCommentInfo from "views/detail/childDetail/DetailCommentInfo";
import DetailRecommendInfo from "views/detail/childDetail/DetailRecommendInfo";
// import GoodsList from "content/goods/GoodsList";
import DetailBottomBar from "views/detail/childDetail/DetailBottomBar";

import Scroll from "common/scroll/Scroll";

import BackTop from "content/backTop/BackTop";

//网络请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

//导入工具类
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { debounce } from "@/common/util";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themTopYs: [],
      getThemTopY: null,
      currentIndex: 0,
    };
  },
  mounted() {
    console.log("mixin自动挂载");
  },
  destroyed() {
    this.$bus.$off("imageLoadItem", this.itemImageListener);
  },

  created() {
    this.iid = this.$route.params.iid;
    console.log(this.iid);

    //根据id来获取商品详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      //获取详情页顶部轮播图片信息
      this.topImages = data.itemInfo.topImages;
      //   console.log(this.topImages.length);

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详细数据
      this.detailInfo = data.detailInfo;

      //5.保存商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo + "454545");
        // console.log(this.commentInfo);
      }
    });

    getRecommend().then((res, error) => {
      if (error) return;
      this.recommendList = res.data.list;
      console.log(this.recommendList);
    });

    //给getThemTopY赋值
    this.getThemTopY = debounce(() => {
      // console.log("我是biubiu");
      this.$refs.scroll.refresh();
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      console.log(this.themTopYs);
    });

    //获取的值不对
    // this.$nextTick(() => {
    //   this.themTopYs = [];
    //   this.themTopYs.push(0);
    //   this.themTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themTopYs);
    // });
  },
  updated() {},
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    // GoodsList,
    DetailBottomBar,
    BackTop,
  },
  methods: {
    imageLoad() {
      this.getThemTopY();
    },
    itemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 200);
    },
    contenPosition(position) {
      // console.log(position);

      //1.获取当前滚动位置的Y值：
      const positionY = -position.y;

      //2.和themTopYs: [],里的值对比[0, 13378, 14188, 14403]
      let length = this.themTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          (i < length - 1 &&
            positionY >= this.themTopYs[i] &&
            positionY < this.themTopYs[i + 1]) ||
          (i === length - 1 && positionY >= this.themTopYs[i])
        ) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //监控什么时候显示回到顶部按钮
      this.backTopListener(position);
    },
    addToCart() {
      //获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;

      //将商品添加到购物车
      // this.$store.commit("addProductToCart", product);
      this.$store.dispatch("addProductToCart", product).then((res) => {
        console.log(res);
        //添加成功消息框
        this.$toast.messageToast1(res, 1500);
      });
    },
  },
};
</script>


<style scoped>
#mydetail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>