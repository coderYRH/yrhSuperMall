<template>
  <div class="image">
    <div class="image-item" v-for="item in imageDisplay">
      <img :src="item.image" alt="" />
      <div class="item-font">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryDisplay",
  props: {
    imageDisplay: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.image {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.image-item {
  flex: 1;
  text-align: center;
}
.image-item img {
  width: 78px;
  height: 78px;
  padding: 5px 10px;
}
.item-font {
  font-size: 12px;
}
</style>