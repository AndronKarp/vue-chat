import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../configs/firebase";
import MainLayout from "../layouts/MainLayout";
import FormLayout from "../layouts/FormLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PageChats",
    meta: {
      title: "Vue Chat",
      requiresAuth: true,
      layout: MainLayout
    },
    component: () =>
      import(/* webpackChunkName: "chats" */ "../pages/PageChats")
  },
  {
    path: "/chats/:id",
    name: "PageChatRoom",
    props: true,
    meta: {
      title: "Some chat",
      requiresAuth: true,
      layout: MainLayout
    },
    component: () =>
      import(/* webpackChunkName: "chat-room" */ "../pages/PageChatRoom")
  },
  {
    path: "/reg",
    name: "PageRegistration",
    meta: {
      requiresUnauthorizedUser: true,
      layout: FormLayout
    },
    component: () =>
      import(/* webpackChunkName: "registration" */ "../pages/PageRegistration")
  },
  {
    path: "/auth",
    name: "PageAuthorization",
    meta: {
      requiresUnauthorizedUser: true,
      layout: FormLayout
    },
    component: () =>
      import(
        /* webpackChunkName: "authorization" */ "../pages/PageAuthorization"
      )
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const routeRequiresUnauthorizedUser = to.matched.some(
    record => record.meta.requiresUnauthorizedUser
  );
  const userIsAuthorized = await auth.getCurrentUser();
  if (userIsAuthorized) {
    routeRequiresUnauthorizedUser ? next("/") : next();
  } else {
    routeRequiresAuth ? next("/auth") : next();
  }
});

export default router;
