<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from "./components/layout/Layout.vue";

export default {
  name: "App",
  components: {
    Layout
  },

  data: () => ({})
};
</script>
