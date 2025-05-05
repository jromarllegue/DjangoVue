<template>
  <div class="admin-page">
    <header class="header">
      <h1>Admin Dashboard</h1>
      <button class="btn-mute" @click="toggleMute">
        <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
      </button>
    </header>

    <div class="content">
      <nav class="sidebar">
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#users">Users</a></li>
        </ul>
      </nav>

      <main class="main-content">
        <section id="overview" class="section">
          <h2>Overview</h2>
          <p>Welcome to the admin dashboard. Here you can manage products, orders, and users.</p>
        </section>

        <section id="products" class="section">
          <h2>Products</h2>
          <div class="product-list">
            <div v-for="(product, index) in products" :key="index" class="product-card">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <p><strong>Price:</strong> ${{ product.price }}</p>
              <button @click="addToCart(product)">Add to Cart</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isMuted = ref(false);

const toggleMute = () => {
  isMuted.value = !isMuted.value;
};

const products = computed(() => store.getters.paginatedProducts);

const addToCart = (product) => {
  console.log('Add to cart:', product);
};
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0066ff;
  color: white;
  padding: 1rem 2rem;
}

.btn-mute {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: #004bb5;
  color: white;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.section {
  margin-bottom: 2rem;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.product-card h3 {
  margin-top: 0;
}

.product-card button {
  margin-top: 1rem;
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #004bb5;
}
</style>
