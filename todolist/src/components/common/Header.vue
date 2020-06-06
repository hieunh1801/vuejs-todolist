<template>
  <v-app-bar outline flat id="topBar">
    <v-app-bar-nav-icon @click="onEmitToggleDrawer()"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    onEmitToggleDrawer() {
      this.$emit("onToggleDrawer");
    }
  },
  data: () => ({})
};
</script>
<style scoped>
#topBar {
  height: 64px;
}
</style>
