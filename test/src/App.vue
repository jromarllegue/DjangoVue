<template>
  <div id="app">
    <!-- Navbar (only visible when authenticated) -->
    <nav v-if="$store.getters.isAuthenticated" class="navbar">
      <div class="container-fluid">
        <router-link class="navbar-brand neon-text" to="/dashboard">My Dashboard</router-link>
        <div class="nav-links">
          <router-link class="nav-item" to="/profile">Profile</router-link>
          <router-link class="nav-item" to="/settings">Settings</router-link>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  mounted() {
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Ensure existingUsers is an array before modifying it
    if (!Array.isArray(existingUsers)) {
      existingUsers = [];
    }

    // If no users exist, add the admin user
    if (existingUsers.length === 0) {
      existingUsers.push({
        fullName: "Admin User",
        username: "admin",
        email: "admin@example.com",
        phone: "1234567890",
        password: "admin123",
        role: "admin",
      });

      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #000000);
  display: flex;
  flex-direction: column;
}

/* Navbar Styling */
.navbar {
  position: fixed; /* Fixed position at the top */
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(20, 20, 20, 0.95);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Ensure navbar stays on top of content */
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00eaff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

.nav-item:hover {
  color: #00eaff;
}

.logout-btn {
  background: #ff4d4d;
  border: none;
  padding: 8px 15px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background: #ff3333;
}

/* Main content padding adjustment for fixed navbar */
#app > .container-fluid {
  padding-top: 70px; /* Adjust space to account for the fixed navbar */
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
