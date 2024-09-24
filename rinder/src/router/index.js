import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import AccountView from "../views/AccountView.vue";
import TermsPage from "../views/TermsPage.vue";
import ContactPage from "../views/ContactView.vue";
import ChatCardView from "../views/ChatCardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/newchat",
      name: "newchat",
      component: ChatCardView,
    },
    {
      path: "/chat/:userName?",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactPage,
    },
    {
      path: "/terms",
      name: "terms",
      component: TermsPage,
    },
    {
      path: "/login",
      name: "login",
      component: AccountView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
