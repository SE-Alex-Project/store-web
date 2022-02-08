import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/Accounts",
    name: "Accounts",
    component: () => import("../views/Accounts.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductPage.vue"),
  },
  {
    path: "/productEdit",
    name: "productEdit",
    component: () => import("../views/productEdit.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/cart.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings.vue"),
  },
  {
    path: "/modifyUser",
    name: "modifyUser",
    component: () => import("../views/modifyUser.vue"),
  },
  {
    path: "/empPages",
    name: "empPages",
    component: () => import("../views/empPages.vue"),
  },
  {
    path: "/statistics",
    name: "StatistcPages",
    component: () => import("../views/statistics.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
