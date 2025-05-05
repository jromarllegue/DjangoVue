<template>
  <div class="home-page">
    <section class="hero">
      <h1>Welcome to MusicTrack</h1>
      <p>Your gateway to immersive music and stunning visuals.</p>
      <router-link to="/product">
        <button class="btn-enter-store">
          <i class="fas fa-music"></i> Enter Store
        </button>
      </router-link>
    </section>

    <section class="features">
      <h2>Features</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <i class="fas fa-wave-square"></i>
          <h3>Dynamic Visualizer</h3>
          <p>Experience real-time visuals that dance with your music.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-shopping-cart"></i>
          <h3>Curated Tracks</h3>
          <p>Choose from a handpicked collection of stunning audio visuals.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-headphones-alt"></i>
          <h3>Immersive Audio</h3>
          <p>Listen to high-quality tracks with unique genre-based themes.</p>
        </div>
      </div>
    </section>

    <section class="why-musictrack">
      <h2>Why MusicTrack?</h2>
      <p>We blend stunning visuals with curated audio experiences to bring you closer to the beat. Dive in and explore the synergy between sight and sound.</p>
      <ul>
        <li>🎧 Streamline audio + visuals</li>
        <li>🚀 Lightning-fast delivery</li>
        <li>🌐 Access anywhere</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #222;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.btn-enter-store {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-enter-store:hover {
  background-color: #004bb5;
}

.features {
  margin-bottom: 3rem;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.feature-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
}

.feature-card {
  background: #f0f4ff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.feature-card i {
  font-size: 2.5rem;
  color: #0066ff;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
}

.why-musictrack {
  background: #e6f0ff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.why-musictrack h2 {
  margin-bottom: 1rem;
}

.why-musictrack ul {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
}

.why-musictrack ul li {
  margin: 0.5rem 0;
}
</style>
