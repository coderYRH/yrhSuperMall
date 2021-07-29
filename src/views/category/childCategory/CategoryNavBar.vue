<template>
  <div class="categoryNavBar" slot="center">
    <span>商品分类</span>
  </div>
</template>


<script>
import Navbar from "common/navbar/NavBar";

export default {
  name: "CategoryNavBav",
  components: {
    Navbar,
  },
};
</script>


<style scoped>
.categoryNavBar {
  background-color: var(--color-tint);
  text-align: center;
  line-height: 44px;
}
</style>