<template>
  <div class="left-nav">
    <ul v-for="(item, index) in leftInfo">
      <li
        @click="getCurrentIndex(index)"
        :class="{ isActive: currentIndex == index }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "CategoryLeftNav",
  props: {
    leftInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: "",
    };
  },
  methods: {
    getCurrentIndex(index) {
      this.currentIndex = index;
      const newMaitKey = this.leftInfo[index].maitKey * 1;
      const newMiniWallkey = this.leftInfo[index].miniWallkey * 1;
      this.$emit("changeType", [newMaitKey, newMiniWallkey]);
    },
  },
};
</script>


<style scoped>
.left-nav {
  width: 100px;
  text-align: center;
  font-size: 14px;
}
ul {
  width: 100%;
}
li {
  line-height: 45px;
}

.isActive {
  border-left: solid 2px var(--color-tint);
}
</style>