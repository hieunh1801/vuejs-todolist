<template>
  <div id="drawer">
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="avartarSrc" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>ABC Cop</v-list-item-title>
          <v-list-item-subtitle>Developer</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link @click="goToPage(item)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <div id="footerDrawer">
      <v-btn icon large>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  props: {},
  data() {
    return {
      items: [
        { title: "Todolist", icon: "mdi-calendar-check", href: "todo" },
        { title: "Note", icon: "mdi-note", href: "note" }
      ],
      color: "primary",
      avartarSrc:
        "https://vtv1.mediacdn.vn/thumb_w/650/2018/9/26/photo-1-15379499713571345268332.jpeg"
    };
  },
  mounted() {
    console.log({ router: this.$router });
  },
  computed: {},
  methods: {
    goToPage(item) {
      let current_path = this.$router.history.current.fullPath;
      current_path = current_path.slice(1);
      if (item.href != current_path) {
        this.$router.push(item.href);
      }
    }
  }
};
</script>
<style scoped>
#drawer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-color: #e4e4e4de;
  border-style: solid;
  border-width: 0 0.5px 0 0;
}
#footerDrawer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
}
</style>
