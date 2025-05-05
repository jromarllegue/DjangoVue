<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark">
    <div class="card p-4 shadow-lg login-card">
      <h2 class="text-center mb-4 text-light">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label text-light">Username</label>
          <input id="email" v-model="username" type="text" class="form-control input-dark" placeholder="Enter username"
            required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label text-light">Password</label>
          <input id="password" v-model="password" type="password" class="form-control input-dark"
            placeholder="Enter password" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p class="mt-3 text-center text-light">
        Don't have an account?
        <router-link to="/register" class="text-primary">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      const success = await this.login({
        username: this.username,
        password: this.password,
      });

      if (success) {
        alert("Login successful!");
        this.$router.push("/dashboard");
        // const user = this.$store.state.user; // Ensure you're getting the latest user state
        // if (user && user.role === "admin") {
        //   this.$router.push("/admin");
        // } else {
        //   this.$router.push("/dashboard");
        // }
      } else {
        alert("Invalid credentials.");
      }
    },
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212;
}

.login-card {
  max-width: 400px;
  width: 100%;
  background: rgba(33, 33, 33, 0.95);
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
}

.input-dark {
  background-color: #222;
  border: 1px solid #444;
  color: #fff;
}

.input-dark::placeholder {
  color: #888;
}

.btn-primary {
  background-color: #00eaff;
  border: none;
}

.btn-primary:hover {
  background-color: #00c4d4;
}
</style>