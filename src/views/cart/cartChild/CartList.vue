<template>
  <div class="cart-list1">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";

import CartListItem from "./CartListItem";

//vux里的方法
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  activated() {
    this.$refs.scroll.refresh();
  },
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>


<style scoped>
.cart-list1 {
  height: 100%;
}
.content {
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>