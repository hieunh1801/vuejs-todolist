<template>
  <v-app>
    <div id="layout">
      <v-row no-gutters>
        <v-col cols="2" id="drawer" no-gutters>
          <Drawer></Drawer>
        </v-col>
        <v-col cols="10" no-gutters id="contentContainer">
          <Header @onToggleDrawer="onToggleDrawer"></Header>
          <slot></slot>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import Drawer from "../common/Drawer.vue";
import Header from "../common/Header.vue";

export default {
  name: "Layout",
  components: { Header, Drawer },
  methods: {
    onToggleDrawer() {
      console.log("onToggleDrawer", this.drawer);
      this.drawer = !this.drawer;
    }
  },
  data: () => ({
    drawer: false
  })
};
</script>
<style scoped>
#layout {
  display: flex;
  /* background-color: aqua; */
  /* overflow: hidden; */
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
}
/* #contentContainer {
  display: flex;
  flex: 1;
  background-color: red;
  overflow: hidden;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: column;
  height: 950px;
  width: 100%;
} */
</style>