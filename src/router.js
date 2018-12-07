import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./views/Login.vue";
import DashboardComponent from "./views/Dashboard.vue";
import BuilderComponent from "./views/Builder.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardComponent
    },
    {
      path: "/builder",
      name: "builder",
      component: BuilderComponent
    }
  ]
});

// {
//   path: "/dashboard",
//   name: "dashboard",
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import(/* webpackChunkName: "about" */ "./views/Dashboard.vue")
// },
// {
//   path: "/builder",
//   name: "builder",
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import(/* webpackChunkName: "about" */ "./views/Builder.vue")
// }
