<template>
  <v-row id="todoPage" no-gutters>
    <v-col cols="3" id="projectsContainer" no-gutters>
      <div class="paginateContainer">
        <v-text-field
          v-model="projectSearchValue"
          clearable
          outlined
          dense
          append-icon="mdi-file-find"
          placeholder="Tìm kiếm"
          @click:append="onSearchProject"
        ></v-text-field>
      </div>
      <v-skeleton-loader :loading="isLoadingProject" height="100" type="list-item-three-line">
        <v-list>
          <v-list-item
            v-for="(project, index) in projects"
            :key="index"
            @click="onSelectProject(project)"
            :class="{active: isProjectSeleted(project.id)}"
          >
            <v-hover v-slot:default="{ hover }">
              <v-row no-gutters>
                <v-col cols="8" no-gutters>
                  <div outlined class="projectItem">
                    <div class="projectItemTitle">{{project.name}}</div>
                  </div>
                </v-col>
                <v-col cols="3">
                  <v-row :class="{hidden: !hover}">
                    <v-btn icon color="primary">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-hover>
          </v-list-item>
        </v-list>
      </v-skeleton-loader>
    </v-col>

    <v-col cols="9" id="todoContainer">
      <!-- <div class="paginateContainer">
        <v-text-field
          v-model="todoSearchValue"
          clearable
          outlined
          dense
          append-icon="mdi-file-find"
          placeholder="Tìm kiếm"
          @click:append="onSearchTodo"
        ></v-text-field>
      </div>-->
      <div class="projectTitle">{{projectNameSelected}}</div>
      <v-skeleton-loader :loading="isLoadingTodos" height="500" type="list-item-three-line">
        <v-list>
          <v-list-item
            v-for="(todo, index) in todos"
            :key="index"
            hover
            @click="onClickTodoItem(todo.id)"
            class="todoItem"
            :class="{todoDone: todo.done}"
          >
            <v-hover v-slot:default="{ hover }">
              <div class="projectItem" :class="{ hoverItemTodo: hover}">
                <v-row>
                  <v-col cols="10">
                    <div class="projectItemTitle">{{todo.name}}</div>
                    <div>{{todo.detail}}</div>
                  </v-col>
                  <v-col cols="2">
                    <div :class="{hidden: !hover}">
                      <v-btn icon color="green lighten-1" v-if="!todo.done">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn icon color="orange lighten-1" v-if="todo.done">
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                      <v-btn icon color="primary">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="red">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-hover>
          </v-list-item>
        </v-list>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import projectService from "../../api/projectService";
import todoService from "../../api/todoService";
export default {
  name: "TodoPage",
  components: {},
  data: () => ({
    isLoadingProject: false,
    projects: [],
    projectSearchValue: "",
    projectsPaginate: {
      _page: 1,
      _limit: 10
    },
    projectIdSelected: -1,
    projectNameSelected: "",

    isLoadingTodos: false,
    todoSearchValue: "",
    todoPaginate: {
      _page: 1,
      _limit: 10
    },
    todos: []
  }),
  methods: {
    // call api
    async callApiGetProject(filter = null, _page = 1, _limit = 10) {
      this.isLoadingProject = true;
      const data = await projectService.getAll(_page, _limit, filter);
      this.isLoadingProject = false;
      await console.log(data);
      return data;
    },
    async callApiGetTodo(filter = null) {
      this.isLoadingTodos = true;
      const data = await todoService.getAll(filter);
      this.isLoadingTodos = false;
      await console.log("todoService", data);
      return data;
    },

    // load data
    async loadProject() {
      const _page = this.projectsPaginate._page;
      const _limit = this.projectsPaginate._limit;
      let filter = Object();
      if (this.projectSearchValue) {
        filter.name = this.projectSearchValue;
      }
      const data = await this.callApiGetProject(filter, _page, _limit);
      this.projects = await data;
      if (data && data[0].id) {
        this.projectIdSelected = await data[0].id;
        this.projectNameSelected = await data[0].name;
        await this.loadTodo();
      }
    },
    async loadTodo() {
      const _page = this.todoPaginate._page;
      const _limit = this.todoPaginate._limit;
      const project_id = this.projectIdSelected;
      let filter = { _page, _limit, project_id };
      if (this.todoSearchValue) {
        filter.name = this.todoSearchValue;
      }
      const data = await this.callApiGetTodo(filter);
      this.todos = await data;
    },
    onSearchProject() {
      this.projectsPaginate = {
        _page: 1,
        _limit: 10
      };
      this.projectIdSelected = -1;

      this.loadProject();
    },
    onSearchTodo() {
      this.projectsPaginate = {
        _page: 1,
        _limit: 10
      };
      this.loadTodo();
    },
    onSelectProject(project) {
      this.projectIdSelected = project.id;
      this.projectNameSelected = project.name;
      this.loadTodo();
    },
    isProjectSeleted(id) {
      return this.projectIdSelected == id;
    },
    onClickTodoItem(id) {
      console.log("onClickTodoItem", id);
    }
  },
  mounted() {
    this.loadProject();
  }
};
</script>
<style scoped>
#todoPage {
  /* background-color: red; */
  margin-left: 0px;
  height: calc(100% - 64px);
}
.projectItem {
  /* border-color: #e4e4e4de;
  border-style: solid;
  border-width: 0 0 0.1px 0; */
  width: 100%;
  padding: 5px;
}
#projectsContainer {
  border-color: #e4e4e4de;
  border-style: solid;
  border-width: 0 0.5px 0 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 80%;
  padding: 0 10px;
  /* background-color: antiquewhite; */
}
#todoContainer {
  border-color: #e4e4e4de;
  border-style: solid;
  border-width: 0 0.5px 0 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 95%;
  overflow: scroll;
  overflow-x: hidden;
}
.active {
  background-color: #e4e4e4de;
  border-radius: 1px;
}
.paginateContainer {
  padding: 0 15px;
}
.hoverItemTodo {
  /* background-color: red; */
}
.hidden {
  display: none;
}
.projectTitle {
  width: 100%;
  height: 50px;
  font-size: 24px;
  font-weight: 600;
  padding: 20px;
  margin-bottom: 15px;
}
.todoDone {
  background-color: #e4e4e4de;
}
.todoItem {
  margin-bottom: 1px;
}
</style>