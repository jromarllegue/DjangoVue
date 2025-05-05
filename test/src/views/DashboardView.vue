<template>
  <!-- <DashboardLayout> -->
  <div class="dashboard-container">
    <!-- Main Content -->
    <main class="main-content">
      <h2 class="neon-text">Welcome, {{ user?.email }}</h2>
      <p class="subtext">This is your personalized dashboard.</p>

      <!-- Add Book Button -->
      <button @click="addBook" class="btn btn-success btn-sm">Add New Book</button>

      <div class="table-responsive" style="margin-top: 20px;">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Publish Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterate over the books stored in Vuex -->
            <tr v-for="(book, index) in books" :key="book.id || index">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.published_date }}</td>
              <td>
                <button @click="editBook(book)" class="btn btn-warning btn-sm">Edit</button>
                <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for adding or editing a book -->
      <BookModal :isVisible="isModalVisible" :book="currentBook" @close="isModalVisible = false" @save="saveBook" />
    </main>
  </div>
  <!-- </DashboardLayout> -->
</template>

<script>
import BookModal from '../components/BookModal.vue';

export default {
  components: {
    BookModal,
  },
  data() {
    return {
      isModalVisible: false,  // To control modal visibility
      currentBook: { id: null, title: '', description: '', published_date: '' }, // Add publish_date to currentBook
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    // Access books from the Vuex store
    books() {
      return this.$store.getters['books/getBooks'];
    },
  },
  created() {
    // Fetch books from the API when the component is created
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch('books/fetchBooks');
    },
    // Open modal for adding a new book
    addBook() {
      this.currentBook = { id: null, title: '', description: '', published_date: '' };  // Reset current book for new entry
      this.isModalVisible = true;
    },
    // Open modal for editing an existing book
    editBook(book) {
      this.currentBook = { ...book };  // Clone the book data for editing
      this.isModalVisible = true;
    },
    // Save book (either create or update)
    saveBook(book) {
      if (book.id) {
        // Update book
        this.$store.dispatch('books/updateBook', book);
      } else {
        // Add new book
        this.$store.dispatch('books/addBook', book);
      }
      this.isModalVisible = false; // Close modal after save
    },
    // Delete a book
    deleteBook(bookId) {
      if (confirm('Are you sure you want to delete this book?')) {
        this.$store.dispatch('books/deleteBook', bookId);
      }
    },
  },
};
</script>

<style scoped>
/* Main Content */
.main-content {
  padding: 40px;
  text-align: center;
  padding-top: 75px;
}

.neon-text {
  font-size: 2rem;
  color: #00eaff;
  text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
}

.table-responsive {
  margin-top: 20px;
}

.table {
  background-color: #1e1e1e;
  /* dark background */
  color: #252525;
  /* light text */
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid #333;
  /* dark border */
  padding: 12px;
  text-align: center;
}

.table thead {
  background-color: #2c2c2c;
  /* darker for the header */
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #2a2a2a;
  /* dark row */
}

.table-striped tbody tr:nth-child(even) {
  background-color: #242424;
  /* slightly darker row */
}

.table-striped tbody tr:hover {
  background-color: #383838;
  /* hover effect */
}

.btn-sm {
  margin-right: 5px;
}
</style>
