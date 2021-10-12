<template>
  <div id="nav" class="flex pull-left">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | -->
    <el-select placeholder="請選擇" v-model="selectView" @change="changeView">
      <el-option :value="0" label="請選擇"></el-option>
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.trans"
        :value="item.key"
      >
      </el-option>
    </el-select>
  </div>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "App",
  mixins: [useRouter],
  data: function () {
    return {
      selectView: 0,
      options: [
        {
          key: 1,
          path: "/pharmacy/list/period",
          trans: "營業中的藥局",
        },
        {
          key: 2,
          path: "/mask/list",
          trans: "各藥局販售的口罩",
        },
        {
          key: 3,
          path: "/pharmacy/list/price",
          trans: "依據價格搜尋藥局",
        },
        {
          key: 4,
          path: "/transaction/list/user",
          trans: "顧客消費排名",
        },
      ],
      router: useRouter(),
    };
  },
  methods: {
    changeView: function () {
      if (this.selectView == 0) {
        return;
      }

      const selected = this.options.find((o) => o.key == this.selectView);
      this.$router.push({ path: selected.path });
    },
  },
};
</script>

<style>
@import './assets/main.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
