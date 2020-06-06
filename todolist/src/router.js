import VueRouter from "vue-router";
import TodoPage from "./components/pages/TodoPage.vue";
import NotePage from "./components/pages/NotePage.vue";

const routes = [
  { path: "/todo", component: TodoPage },
  { path: "/note", component: NotePage },

  {
    path: "*",
    redirect: { name: "todo" },
    component: {
      render(h) {
        return h("div", "404. Not Found.");
      }
    }
  }
];
export default new VueRouter({ routes });
