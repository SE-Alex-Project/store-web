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
  {
    path: "/owner",
    name: "owner",
    component: () => import("../views/owner.vue"),
  },
  {
    path: "/remEmp",
    name: "remEmp",
    component: () => import("../views/remEmp.vue"),
  },
  {
    path: "/remCust",
    name: "remCust",
    component: () => import("../views/remCust.vue"),
  },
  {
    path: "/moreOptions",
    name: "moreOptions",
    component: () => import("../views/moreOptions.vue"),
  },
  {
    path: "/MangerCartView",
    name: "MangerCartView",
    component: () => import("../views/MangerCartView.vue"),
  },
  {
    path: "/verifyUser",
    name: "verifyUser",
    component: () => import("../views/verifyUser.vue"),
  },
  {
    path: "/modEmp",
    name: "modEmp",
    component: () => import("../views/modEmp.vue"),
  },
  {
    path: "/catStor",
    name: "catStor",
    component: () => import("../views/catStor.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
