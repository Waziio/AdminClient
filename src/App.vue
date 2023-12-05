<script>
import Btn from "primevue/button";
import router from "../router.js";

export default {
  name: "App",
  components: {
    Btn,
  },
  methods: {
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async logout() {
      this.loading = true;
      await this.delay(1000).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("isConnected");
        router.push("/login");
        this.loading = false;
      });
    },
  },

  data() {
    return {
      success: true,
      loading: false,
    };
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logout-button {
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px;
  z-index: 9999;
}
</style>
