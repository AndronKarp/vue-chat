import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../configs/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../pages/PageHome")
  },
  {
    path: "/reg",
    name: "Registration",
    meta: { requiresUnauthorizedUser: true },
    component: () =>
      import(/* webpackChunkName: "registration" */ "../pages/PageRegistration")
  },
  {
    path: "/auth",
    name: "Authorization",
    meta: { requiresUnauthorizedUser: true },
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
  const routeRequiresUnauthorizedUser = to.matched.some(
    record => record.meta.requiresUnauthorizedUser
  );
  const userIsAuthorized = await auth.getCurrentUser();
  routeRequiresUnauthorizedUser && userIsAuthorized
    ? next({ path: "/" })
    : next();
});

export default router;
