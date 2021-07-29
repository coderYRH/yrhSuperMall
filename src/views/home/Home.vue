<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isfixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-load="true"
      @scroll="contentScroll"
      @pullMore="pullMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
//导入子模块

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

//导入公共模块
import NavBar from "common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";
import BackTop from "content/backTop/BackTop";

//导入工具类
import { itemListenerMixin } from "@/common/mixin";

import Scroll from "common/scroll/Scroll";
//网路请求
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffSetTop: 0,
      isfixed: false,
      saveY: 0,
    };
  },
  created() {
    //请求多个数据

    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    console.log("1");
  },
  activated() {
    // console.log("actived");
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);

    // this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactived");
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("imageLoadItem", this.itemImageListener);
  },
  computed: {},

  methods: {
    //事件监听的方法

    //
    swiperImageLoad() {
      // console.log("蜀都赋");
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffSetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.taboffSetTop);
      this.$refs.scroll.refresh();
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // console.log(position);

      //监控什么时候显示回到顶部按钮
      this.isShowBackTop = -position.y > 1000;

      //监控上面时候fixed tabControl 导航
      this.isfixed = -position.y > this.taboffSetTop;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    pullMore() {
      console.log("下载更多");
      this.getHomeGoods(this.currentType);

      //在这里调用refresh函数 可能是在 第一次图片全部加载完才刷新一次，而在上面mounted里面的refresh是在指定时间类刷新
      // this.$refs.scroll.refresh();
      // console.log("//////////////");
    },

    //网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成加载更多 ，需要继续请求的话需调用下面的函数
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 以下部分自由在原生滚动起效果
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .tab-control {
  以下属性 只在原生滚动中有吸顶效果，在better-scroll没有效果
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100%-93px);
  overflow: hidden;
} */
</style>
