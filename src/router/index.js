import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../configs/firebase";
import MainLayout from "../layouts/MainLayout";
import FormLayout from "../layouts/FormLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requiresAuth: true,
      layout: MainLayout
    },
    component: () => import(/* webpackChunkName: "home" */ "../pages/PageHome")
  },
  {
    path: "/reg",
    name: "Registration",
    meta: {
      requiresUnauthorizedUser: true,
      layout: FormLayout
    },
    component: () =>
      import(/* webpackChunkName: "registration" */ "../pages/PageRegistration")
  },
  {
    path: "/auth",
    name: "Authorization",
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
