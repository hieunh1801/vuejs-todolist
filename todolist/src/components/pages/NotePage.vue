<template>
  <div id="notePageContainer">
    <v-row id="noteSearch">
      <v-col cols="3">
        <v-text-field dense outlined append-icon="mdi-file-find"></v-text-field>
      </v-col>
      <v-col cols="8">
        <Tags :tags="tags"></Tags>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <Notes :notes="notes"></Notes>
    </v-row>
  </div>
</template>

<script>
import Notes from "./NotePage/Notes.vue";
import Tags from "./NotePage/Tags.vue";
import tagService from "../../api/tagService";
import noteService from "../../api/noteService";
export default {
  name: "NotePage",
  components: { Tags, Notes },
  data: () => ({
    tags: [],
    notes: [],
    noteSearchValue: null
  }),
  methods: {
    async callApiGetTags(filter = null) {
      return await tagService.getAll(filter);
    },
    async loadTags() {
      const filter = null;
      const data = await this.callApiGetTags(filter);
      this.tags = await data;
    },
    async callApiGetNotes(filter = null) {
      return await noteService.getAll(filter);
    },
    async loadNotes() {
      let filter = {};
      if (this.noteSearchValue != null || this.noteSearchValue != "") {
        filter.name = this.noteSearchValue;
      }
      const data = this.callApiGetNotes();
      this.notes = await data;
    }
  },
  mounted() {
    this.loadTags();
    this.loadNotes();
  }
};
</script>
<style scoped>
#notePageContainer {
  /* background-color: antiquewhite; */
  height: calc(100% - 64px);
  padding: 20px;
}
/* #noteSearch {
  width: 250px;
} */
</style>
