import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(
    window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
  ),
  routes
})

export default router;
