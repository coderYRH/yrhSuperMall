<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    messageToast1(message = "我是默认信息", deration = 1500) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, deration);
    },
  },
};
</script>


<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.397);
  color: #fff;
  z-index: 99;
}
</style>