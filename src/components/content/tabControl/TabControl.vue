<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      class="tab-control-item"
      :class="{ active: currentIndex == index }"
      @click="btnClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>
 

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
  padding-bottom: 10px;
}

.active {
  color: var(--color-high-text);
}
.active span {
  padding: 5px;
  border-bottom: 1px solid var(--color-tint);
}
</style>