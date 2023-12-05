import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./src/views/HomeView.vue";
import LoginPage from "./src/components/LoginPage.vue";
import EditView from "./src/views/EditView.vue";
import SignUpPage from "./src/components/SignUpPage.vue"

const routes = [
  { path: "/client", component: HomeView },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignUpPage, props: true },
  { path: "/client/:id", component: EditView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isConnected = localStorage.getItem("isConnected");

  if ((to.path !== "/login" && to.path !== "/signup") && !isConnected) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/signup") && isConnected) {
    next("/client");
  } else if (to.path === "/") {
    next("/client");
  } else {
    next();
  }
});

export default router;
