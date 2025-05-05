import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"; // Import Vuex store
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import Dashboard from "@/views/DashboardView.vue";
import AdminPanel from "@/views/AdminPanel.vue";

const routes = [
  { path: "/", redirect: "/login" }, // Default to login
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Mark route as protected
  },
  {
    path: "/admin",
    component: AdminPanel,
    meta: { requiresAuth: true }, // Protected route, but no role-based access
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.user !== null; // Check if the user is authenticated

  console.log("Navigation Guard - Authenticated:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect if not logged in
  } else if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
    next("/dashboard"); // Redirect logged-in users away from login/register
  } else {
    next(); // Proceed to the route
  }
});

export default router;

// import { createRouter, createWebHistory } from "vue-router";
// import store from "@/store"; // Import Vuex store
// import Login from "@/views/LoginView.vue";
// import Register from "@/views/RegisterView.vue";
// import Dashboard from "@/views/DashboardView.vue";
// import AdminPanel from "@/views/AdminPanel.vue";

// const routes = [
//   { path: "/", redirect: "/login" }, // Default to login
//   { path: "/login", component: Login },
//   { path: "/register", component: Register },
//   {
//     path: "/dashboard",
//     component: Dashboard,
//     meta: { requiresAuth: true }, // Mark route as protected
//   },
//   {
//     path: "/admin",
//     component: AdminPanel,
//     meta: { requiresAuth: true, requiresRole: "admin" }, // Restricted to admin
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters.isAuthenticated;
//   const userRole = store.getters.getUserRole;

//   console.log("Navigation Guard - Authenticated:", isAuthenticated, "Role:", userRole);

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/login"); // Redirect if not logged in
//   } else if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
//     next("/dashboard"); // Redirect logged-in users away from login/register
//   } else if (to.meta.requiresRole && userRole !== to.meta.requiresRole) {
//     next("/dashboard"); // Redirect users without required role
//   } else {
//     next(); // Proceed to the route
//   }
// });

// export default router;
