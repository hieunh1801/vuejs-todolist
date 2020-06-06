<template>
  <v-row no-gutters>
    <v-col
      cols="3"
      v-for="(note, index) in notes"
      :key="index"
      class="noteItem"
      @click="editNote(note)"
    >
      <v-card-title>{{ note.title }}</v-card-title>
      <v-card-subtitle>{{ note.subtitle }}</v-card-subtitle>
    </v-col>
    <v-dialog v-model="dialog" width="1000px">
      <v-card id="dialogContainer">
        <!-- Title -->
        <v-card-title>
          <v-text-field
            v-if="isEdit"
            outlined
            label="Title"
            placeholder="Title"
            :value="noteSelected.title"
            class="headerOfNote"
          ></v-text-field>
          <div v-if="!isEdit">{{noteSelected.title}}</div>
          <v-spacer></v-spacer>
          <div class="actionButton">
            <v-btn icon color="primary" @click="isEdit = !isEdit">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <!-- content -->
        <v-card-text id="quillEditorContainer">
          <div v-if="isEdit" id="quillTitle">Content</div>
          <quill-editor
            v-if="isEdit"
            ref="myQuillEditor"
            v-model="noteSelected.content"
            id="quillEditor"
          />
          <div v-if="!isEdit" v-html="noteSelected.content"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Note",
  props: {
    notes: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    dialog: false,
    noteSelected: { title: "", content: "", subtitle: "" },
    quillContent: "",
    isEdit: false
  }),
  methods: {
    editNote(note) {
      this.noteSelected = note;
      this.dialog = true;
      console.log("note", note);
    }
  }
};
</script>
<style scoped>
#noteContainer {
  background-color: red;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 10px 16px;
}
.noteItem {
  margin-bottom: 6px;
  background-color: white;
  border-color: #e4e4e4de;
  border-width: 0.5px;
  border-radius: 2px;
  border-style: solid;
  padding: 5px;
  margin-right: 10px;
}
#dialogContainer {
  padding: 10px;
}
#quillEditorContainer {
  height: 500px;
  padding: 0 20px;
}
#quillEditor {
  height: 20rem;
}
#quillTitle {
  font-size: 16px;
  font-weight: 600;
}
.headerOfNote {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actionButton {
  /* width: 100px; */
  display: flex;
  flex-direction: row;
}
</style>
