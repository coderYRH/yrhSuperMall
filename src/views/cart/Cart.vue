<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ getLength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
//导入公共模块
import NavBar from "common/navbar/NavBar";

//vux里的方法
import { mapGetters } from "vuex";

//导入子模块内容
import CartList from "views/cart/cartChild/CartList";
import BottomBar from "views/cart/cartChild/BottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
  },
  computed: {
    //方法一：
    // getCartCount() {
    //   return this.$store.state.cartList.length;
    // },
    //方法二（1）： 把方法保存到vuex中 此方法太繁琐
    // getCartCount() {
    //   return this.$store.getters.getCartCount;
    // },
    //方法二（2）： 把方法保存到vuex中 此方法可以简化
    // ...mapGetters(["getCartCount"]),
    //方法二（3）： 可以该表调用的方法名：
    ...mapGetters({
      getLength: "getCartCount",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
}
</style>
