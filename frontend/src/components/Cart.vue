<template>
  <div class="cart-container">
    <div v-if="cartItems.length" class="cart-items-wrapper">
      <div v-for="item in cartItems" :key="item.id" class="cart-item"
        :style="{ backgroundImage: `url(${item.BG})`, backgroundSize: 'cover' }">
        <div class="cart-item-overlay"
          :style="{ background: `linear-gradient(135deg, ${item.visualPrimaryColor} 30%, ${item.visualSecondaryColor} 70%)` }">
        </div>

        <div v-for="(product, index) in products" :key="index" class="item" :class="{ active: index === active }"
            :style="{
                ...getSlideStyle(index),
                
            }" @click="$emit('select-product', product)"></div>



        <!-- Album Art & Details -->
        <div class="cart-item-content">
          <img :src="item.BG" class="album-cover" alt="Album Cover" />
          <div class="cart-item-info">
            <h5 class="album-title">{{ item.name }}</h5>
            <p class="album-genre">{{ item.genre }}</p>
          </div>
        </div>

        <!-- Quantity & Actions -->
        <div class="cart-item-actions">
          <input type="number" class="quantity-input" :value="item.quantity"
            @input="handleQuantityChange(item.id, $event.target.value)" min="1" />

          <button class="btn-remove" @click="$emit('remove-item', item.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <p v-else class="empty-cart">
      <i class="fas fa-music"></i> Your playlist is empty.
    </p>

    <!-- Cart Summary -->
    <p class="cart-total">
      Total: <strong>${{ totalPrice }}</strong>
    </p>
    <p class="cart-total-quantity">
      Total Quantity: <strong>{{ totalQuantity }}</strong>
    </p>

    <button class="btn-buy" @click="handleBuyNow" v-if="cartItems.length">
      <i class="fas fa-play-circle"></i> Buy Now
    </button>

    <button class="btn-clear" @click="$emit('clear-cart')" v-if="cartItems.length">
      <i class="fas fa-trash-alt"></i> Clear Cart
    </button>

    <!-- Success Popup -->
    <div v-if="showSuccess" class="purchase-success">
      <transition name="fade">
        <div v-if="loading" class="loading-icon">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="!loading" class="success-content">
          <i class="fas fa-check-circle success-icon"></i>
          <p>Purchase Successful!</p>
          <strong>Total Paid: ${{ totalPrice }}</strong>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MusicCart',
  setup() {
    const store = useStore();
    const showSuccess = ref(false);
    const loading = ref(false);

    const handleBuyNow = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        showSuccess.value = true;

        setTimeout(() => {
          showSuccess.value = false;
          store.dispatch('clearCart');
        }, 3000);
      }, 2000);
    };

    const handleQuantityChange = (id, quantity) => {
      quantity = parseInt(quantity, 10);
      if (isNaN(quantity) || quantity < 0) return;
      store.dispatch("updateQuantity", { id, quantity });
    };


    return {
      cartItems: computed(() => store.getters.cartItems),
      totalPrice: computed(() => store.getters.totalPrice),
      totalQuantity: computed(() => store.getters.totalQuantity),
      updateQuantity: (id, quantity) => store.dispatch('updateQuantity', { id, quantity }),
      removeItem: (id) => store.dispatch('removeItem', id),
      clearCart: () => store.dispatch('clearCart'),
      showSuccess,
      loading,
      handleBuyNow,
      handleQuantityChange,
    };
  },
};
</script>


<style scoped>
/* Scrollable Items */
.cart-items-wrapper {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.cart-items-wrapper::-webkit-scrollbar {
  width: 6px;
}

.cart-items-wrapper::-webkit-scrollbar-thumb {
  background-color: #ff3399;
  border-radius: 5px;
}

.cart-items-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

/* Container */
.cart-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: linear-gradient(145deg, #1a1a1a, #111);
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(255, 0, 150, 0.5);
  color: white;
}

/* Item Card */
.cart-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(255, 0, 150, 0.1);
  transition: transform 0.3s ease;
}

.cart-item:hover {
  transform: scale(1.02);
}

/* Overlay */
.cart-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

/* Content Layout */
.cart-item-content {
  display: flex;
  align-items: center;
  z-index: 2;
}

.album-cover {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.cart-item-info {
  margin-left: 15px;
}

.album-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
}

.album-genre {
  font-size: 0.85rem;
  color: #ff99cc;
}

/* Actions */
.cart-item-actions {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.quantity-input {
  width: 50px;
  padding: 5px;
  font-size: 1rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1);
}

.btn-remove {
  margin-top: 6px;
  background: #ff3366;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-remove:hover {
  background: #cc0033;
}

/* Empty Message */
.empty-cart {
  text-align: center;
  font-size: 1rem;
  color: #ccc;
  margin: 20px 0;
}

/* Totals */
.cart-total,
.cart-total-quantity {
  text-align: center;
  font-size: 1.1rem;
  margin-top: 10px;
}

.cart-total {
  color: #ffcc00;
  font-weight: bold;
}

.cart-total-quantity {
  color: #66ffcc;
}

/* Buttons */
.btn-buy,
.btn-clear {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 4px 12px rgba(255, 0, 100, 0.3);
}

.btn-buy {
  background: linear-gradient(135deg, #ff0077, #ff3366);
  color: white;
}

.btn-clear {
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  color: black;
}

.btn-buy:hover,
.btn-clear:hover {
  transform: scale(1.03);
}

/* Success Popup */
.purchase-success {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(40, 167, 69, 0.95);
  color: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  width: 280px;
  box-shadow: 0 0 20px rgba(0, 255, 100, 0.4);
  z-index: 1000;
}

.success-icon,
.loading-icon i {
  font-size: 42px;
  margin-bottom: 10px;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>