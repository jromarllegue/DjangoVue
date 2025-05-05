<template>
  <div class="about-page">
    <section class="hero">
      <h1>About MusicTrack</h1>
      <p>MusicTrack is your ultimate music store, offering a wide range of tracks and albums to suit every taste. Discover, listen, and shop your favorite music all in one place.</p>
    </section>

    <section class="features">
      <h2>Our Features</h2>
      <ul>
        <li>Extensive music catalog</li>
        <li>Easy-to-use shopping cart</li>
        <li>Audio visualizer for an immersive experience</li>
        <li>Secure and fast checkout</li>
      </ul>
    </section>

    <section class="team">
      <h2>Meet the Team</h2>
      <p>Our dedicated team of music lovers and developers work tirelessly to bring you the best experience.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.features {
  margin-bottom: 2rem;
}

.features h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.features ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.features li {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.team h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.team p {
  text-align: center;
  font-size: 1.1rem;
}
</style>
