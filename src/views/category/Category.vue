<template>
  <div class="category">
    <category-nav-bav></category-nav-bav>
    <category-left-nav
      class="left-nav"
      :left-info="leftinfo"
      @changeType="changeType"
    ></category-left-nav>
    <category-display
      class="display"
      :image-display="typeData"
    ></category-display>
    <tab-control
      class="tab-control"
      :title="['综合', '新品', '销量']"
      @tabClick="tabClick"
    ></tab-control>
    <goods-list :goods="category[currentType]"></goods-list>
  </div>
</template> 

<script>
import CategoryNavBav from "./childCategory/CategoryNavBar";
import CategoryLeftNav from "./childCategory/CategoryLeftNav";
import CategoryDisplay from "./childCategory/CategoryDisplay";

//导入公共模块
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  data() {
    return {
      leftinfo: null,
      maitKey: Number,
      miniWallkey: "",
      typeData: null,
      category: {
        pop: [],
        new: [],
        sell: [],
      },
      currentType: "pop",
      currentIndex: 0,
    };
  },
  created() {
    getCategory().then((res) => {
      console.log(res);
      this.leftinfo = res.data.category.list;
      console.log(this.leftinfo);
      this.maitKey = this.leftinfo[0].maitKey;
      this.miniWallkey = this.leftinfo[0].miniWallkey;
      console.log(this.maitKey);
    });

    setTimeout(() => {
      this.getSubcategory();
    }, 200);

    setTimeout(() => {
      this.getCategoryDetail("pop");
    }, 300);
  },
  mounted() {},
  components: {
    CategoryNavBav,
    CategoryLeftNav,
    CategoryDisplay,
    TabControl,
    GoodsList,
  },
  methods: {
    changeType(newNumber) {
      this.maitKey = newNumber[0];
      this.miniWallkey = newNumber[1];
      console.log(this.maitKey, this.miniWallkey);
      this.getSubcategory();
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
      console.log(this.currentType);
      this.currentIndex = index;
      this.getCategoryDetail("new");
      this.getCategoryDetail("sell");
    },

    //网络请求的方法
    getSubcategory() {
      getSubcategory(this.maitKey).then((res) => {
        console.log(res);
        this.typeData = res.data.list;
      });
    },
    getCategoryDetail(type) {
      const miniWallkey = this.miniWallkey;
      console.log(miniWallkey);
      getCategoryDetail(miniWallkey, type).then((res) => {
        console.log(res);

        this.category[type].push(...res);
      });
    },
  },
};
</script>

<style scoped>
.left-nav {
  float: left;
}
.display {
  margin-top: 10px;
  height: auto;
}
.tab-control {
  margin-top: 10px;
}
</style>
