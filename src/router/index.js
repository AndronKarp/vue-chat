import Vue from "vue";
import VueRouter from "vue-router";

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
    component: () =>
      import(/* webpackChunkName: "registration" */ "../pages/PageRegistration")
  },
  {
    path: "/auth",
    name: "Authorization",
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

export default router;
