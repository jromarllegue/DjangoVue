// import { createStore } from "vuex";
// import axios from "axios";
// import books from "./modules/books";

// // Function to get CSRF token from cookies
// function getCSRFToken() {
//   const token = document.cookie.match(/csrftoken=([^;]+)/);
//   return token ? token[1] : null;
// }

// // Function to delete CSRF token from cookies
// // function deleteCSRFToken() {
// //   document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
// // }

// // Function to delete sessionid from cookies
// function deleteSessionID() {
//   document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
// }

// export default createStore({
//   state: {
//     user: null, // Store user info
//   },
//   getters: {
//     getUser(state) {
//       return state.user;
//     },
//     isAuthenticated(state) {
//       return state.user !== null; // If user is not null, authenticated
//     },
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//     },
//     logout(state) {
//       state.user = null;
//     },
//   },
//   actions: {
//     // Login action with CSRF token
//     async login({ commit }, { username, password }) {
//       try {
//         const csrfToken = getCSRFToken(); // Get CSRF token from cookies
//         const response = await axios.post(
//           "http://localhost:8000/api/auth/login/",
//           { username, password },
//           {
//             withCredentials: true,
//             headers: {
//               "X-CSRFToken": csrfToken, // Include CSRF token in headers
//             },
//           }
//         );
//         commit("setUser", response.data.user); // Store user info in state
//         return true; // Indicate successful login
//       } catch (error) {
//         console.error("Login error:", error);
//         return false; // Indicate failure
//       }
//     },

//     // Register action with CSRF token
//     async register({ commit }, { username, email, password }) {
//       try {
//         const csrfToken = getCSRFToken(); // Get CSRF token from cookies
//         const response = await axios.post(
//           "http://localhost:8000/api/auth/register/",
//           { username, email, password },
//           {
//             headers: {
//               "X-CSRFToken": csrfToken, // Include CSRF token in headers
//             },
//           }
//         );
//         commit("setUser", response.data.user); // Store user info in state
//         return true; // Indicate successful registration
//       } catch (error) {
//         console.error("Registration error:", error);
//         return false; // Indicate failure
//       }
//     },

//     // Logout action with CSRF token reset
//     async logout({ commit }) {
//       try {
//         await axios.post("http://localhost:8000/api/auth/logout/");
//         commit("logout"); // Clear user data in Vuex state
//         // deleteCSRFToken(); 
//         deleteSessionID();
//         return true; // Indicate successful logout
//       } catch (error) {
//         console.error("Logout error:", error);
//         return false; // Indicate failure
//       }
//     },
//   },
//   modules: {
//     books,
//   },
// });

// actions: {
//   registerUser({ commit, state }, user) {
//     if (state.users.some((u) => u.username === user.username)) {
//       return Promise.resolve(false);
//     }
//     user.role = user.role || "user"; // Default role is "user", but can be "admin"
//     commit("REGISTER_USER", user);
//     return Promise.resolve(true);
//   },
// },


import { createStore } from "vuex";
import books from "./modules/books";

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem("users")) || [], // Load users from localStorage
    user: JSON.parse(localStorage.getItem("user")) || null, // Load logged-in user
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
    getUserRole: (state) => (state.user ? state.user.role : null),
    hasPermission: (state) => (role) => state.user && state.user.role === role,
  },
  mutations: {
    REGISTER_USER(state, user) {
      state.users.push(user);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem("user");
      return true;
    },
    EDIT_USER(state, updatedUser) {
      const index = state.users.findIndex((u) => u.username === updatedUser.username);
      if (index !== -1) {
        state.users[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    DELETE_USER(state, username) {
      state.users = state.users.filter((user) => user.username !== username);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  actions: {
    registerUser({ commit, state }, user) {
      if (state.users.some((u) => u.username === user.username)) {
        return Promise.resolve(false);
      }
      user.role = user.role || "user";
      commit("REGISTER_USER", user);
      return Promise.resolve(true);
    },
    login({ commit, state }, { username, password }) {
      return new Promise((resolve) => {
        const existingUser = state.users.find(
          (user) => user.username === username && user.password === password
        );
        if (existingUser) {
          commit("SET_USER", existingUser);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    editUser({ commit }, updatedUser) {
      commit("EDIT_USER", updatedUser);
    },
    deleteUser({ commit }, username) {
      commit("DELETE_USER", username);
    },
  },
  modules: {
    books,
  },
});


// // actions: {
// //   registerUser({ commit, state }, user) {
// //     if (state.users.some((u) => u.username === user.username)) {
// //       return Promise.resolve(false);
// //     }
// //     user.role = user.role || "user"; // Default role is "user", but can be "admin"
// //     commit("REGISTER_USER", user);
// //     return Promise.resolve(true);
// //   },
// // },
