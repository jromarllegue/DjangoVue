<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4 text-light">User List</h2>
      <div class="table-responsive">
        <table class="table table-striped table-dark table-bordered">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.username">
              <td>{{ index + 1 }}</td>
              <td>{{ user.fullName }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>
                <span
                  :class="{
                    'badge bg-danger': user.role === 'admin',
                    'badge bg-primary': user.role === 'user',
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="openEditModal(user)">
                  <i class="bi bi-pencil"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.username)">
                  <i class="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Edit User Modal -->
      <div class="modal fade" ref="editUserModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit User</h5>
              <button type="button" class="btn-close" @click="closeEditModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateUser">
                <div class="mb-3">
                  <label class="form-label">Full Name</label>
                  <input type="text" v-model="editedUser.fullName" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" v-model="editedUser.email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Phone</label>
                  <input type="text" v-model="editedUser.phone" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Role</label>
                  <select v-model="editedUser.role" class="form-select">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import { ref } from "vue";
  import { Modal } from "bootstrap"; // Import Bootstrap's modal component
  
  export default {
    setup() {
      const editUserModal = ref(null);
      let modalInstance = null;
  
      return {
        editUserModal,
        modalInstance,
      };
    },
    data() {
      return {
        editedUser: { fullName: "", username: "", email: "", phone: "", role: "" },
      };
    },
    computed: {
      ...mapGetters(["getUsers"]),
      users() {
        return this.getUsers || [];
      },
    },
    methods: {
      ...mapActions(["editUser", "deleteUser"]),
      openEditModal(user) {
        this.editedUser = { ...user }; // Clone the user data
        if (!this.modalInstance) {
          this.modalInstance = new Modal(this.$refs.editUserModal);
        }
        this.modalInstance.show();
      },
      closeEditModal() {
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      updateUser() {
        this.editUser(this.editedUser);
        this.closeEditModal();
      },
      deleteUser(username) {
        if (confirm(`Are you sure you want to delete ${username}?`)) {
          this.$store.dispatch("deleteUser", username);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
  }
  h2 {
    color: #00eaff;
  }
  </style>
  