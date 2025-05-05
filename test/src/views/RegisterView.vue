<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div class="card p-4 shadow-lg register-card">
            <h2 class="text-center mb-4 text-light">Register</h2>
            <form @submit.prevent="register">
                <div class="row g-3">
                    <!-- Full Name -->
                    <div class="col-md-6">
                        <label for="fullName" class="form-label text-light">Full Name</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person text-primary"></i></span>
                            <input id="fullName" v-model="fullName" type="text" class="form-control input-dark"
                                placeholder="Enter full name" required />
                        </div>
                    </div>

                    <!-- Username -->
                    <div class="col-md-6">
                        <label for="username" class="form-label text-light">Username</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-at text-primary"></i></span>
                            <input id="username" v-model="username" type="text" class="form-control input-dark"
                                placeholder="Enter username" required />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="col-md-12">
                        <label for="email" class="form-label text-light">Email</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-envelope text-primary"></i></span>
                            <input id="email" v-model="email" type="email" class="form-control input-dark"
                                placeholder="Enter email" required />
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="col-md-6">
                        <label for="phone" class="form-label text-light">Phone</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone text-primary"></i></span>
                            <input id="phone" v-model="phone" type="tel" class="form-control input-dark"
                                placeholder="Enter phone number" required />
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="col-md-6">
                        <label for="password" class="form-label text-light">Password</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-lock text-primary"></i></span>
                            <input id="password" v-model="password" type="password" class="form-control input-dark"
                                placeholder="Enter password" required />
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="col-md-12">
                        <label for="confirmPassword" class="form-label text-light">Confirm Password</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-lock-fill text-primary"></i></span>
                            <input id="confirmPassword" v-model="confirmPassword" type="password"
                                class="form-control input-dark" placeholder="Confirm password" required />
                        </div>
                    </div>
                </div>

                <!-- Register Button -->
                <button type="submit" class="btn btn-primary w-100 mt-3">
                    <i class="bi bi-person-plus"></i> Register
                </button>
            </form>

            <p class="mt-3 text-center text-light">
                Already have an account?
                <router-link to="/" class="text-decoration-none text-primary">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    ...mapActions(["registerUser"]),
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Assign "admin" role if username contains "admin"
      this.role = this.username.toLowerCase().includes("admin") ? "admin" : "user";

      // Check if username already exists
      const existingUser = this.users.find((user) => user.username === this.username);
      if (existingUser) {
        alert("Username already exists!");
        return;
      }

      const newUser = {
        fullName: this.fullName,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password, // Store password (optional: hash it in backend)
        role: this.role,
      };

      this.registerUser(newUser);
      alert("Registration successful!");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Dark theme styles */
.bg-dark {
    background-color: #121212;
}

/* Card Styling */
.register-card {
    max-width: 450px;
    width: 100%;
    background: rgba(33, 33, 33, 0.95);
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
}

/* Dark Input Fields */
.input-dark {
    background-color: #222;
    border: 1px solid #444;
    color: #fff;
}

.input-dark::placeholder {
    color: #888;
}

.input-group-text {
    background-color: #222 !important;
    /* Dark background */
    border: 1px solid #444 !important;
    /* Match input borders */
    color: #00eaff !important;
    /* Neon icon color */
}

.input-group-text i {
    color: #00eaff !important;
    /* Ensures icons stay neon */
}

/* Input focus */
.input-dark:focus {
    background-color: #2a2a2a;
    border-color: #00eaff;
    box-shadow: 0 0 8px #00eaff;
}

/* Button Styling */
.btn-primary {
    background-color: #00eaff;
    border: none;
}

.btn-primary:hover {
    background-color: #00c4d4;
}
</style>