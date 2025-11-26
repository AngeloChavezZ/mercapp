// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Lazy loading
const ProductDetailView = () => import("../views/ProductDetailView.vue");
const CartView = () => import("../views/CartView.vue");
const AboutView = () => import("../views/AboutView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");
const ProductNewView = () => import("../views/ProductNewView.vue");
const ProductEditView = () => import("../views/ProductEditView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/new",
    name: "product-new",
    component: ProductNewView,
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/product/:id/edit",
    name: "product-edit",
    component: ProductEditView,
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
