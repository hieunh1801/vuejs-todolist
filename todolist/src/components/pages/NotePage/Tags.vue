<template>
  <v-row justify="space-around" no-gutters>
    <v-col cols="12">
      <v-chip-group id="tagContainer" column active-class="green--text">
        <v-chip
          :close="isCloseChip"
          v-for="(tag, index) in tags"
          :key="index"
          class="tagItem"
        >{{tag.name}}</v-chip>
        <v-btn icon color="orange">
          <v-icon color="orange">mdi-plus-circle-outline</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="isCloseChip = !isCloseChip">
          <v-icon color="red">mdi-minus</v-icon>
        </v-btn>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    isCloseChip: false
  }),
  methods: {}
};
</script>
<style scoped>
.tagItem {
  margin-right: 5px;
}
</style>
