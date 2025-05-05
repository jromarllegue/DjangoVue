<template>
    <div class="slider">
        <div v-for="(product, index) in products" :key="index" class="item" :class="{ active: index === active }"
            :style="{
                ...getSlideStyle(index),
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${product.BG})`
            }" @click="$emit('select-product', product)">

            <!-- Genre Tag -->
            <span class="genre-tag">{{ product.genre }}</span>

            <!-- Title -->
            <h3 class="card-title">{{ product.name }}</h3>

            <!-- Description -->
            <p class="card-description">{{ product.description }}</p>

            <!-- Price -->
            <p class="card-price"><strong>${{ product.price }}</strong></p>

            <div class="button-container">
                <button @click="prevSlide" class="nav-btn" :disabled="transitioning">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="cart-btn" @click.stop="$emit('add-to-cart', product)">
                    <i class="fas fa-cart-plus"></i>
                </button>
                <button @click="nextSlide" class="nav-btn" :disabled="transitioning">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
    setup(_, { emit }) {
        const store = useStore();
        const products = computed(() => store.getters.paginatedProducts);
        const active = ref(0);
        const transitioning = ref(false);

        watch(products, (newProducts) => {
            if (newProducts.length > 0) {
                active.value = 0;
            }
        });

        const getSlideStyle = (index) => {
            if (index === active.value) {
                return {
                    transform: 'none',
                    zIndex: 1,
                    filter: 'none',
                    opacity: 1
                };
            }

            let distance = index - active.value;
            let scale = 1 - 0.2 * Math.abs(distance);
            let blur = 'blur(5px)';
            let opacity = Math.abs(distance) > 2 ? 0 : 0.6;

            return {
                transform: `translateX(${120 * distance}px) scale(${scale}) perspective(16px) rotateY(${distance > 0 ? '-1' : '1'}deg)`,
                zIndex: -Math.abs(distance),
                filter: blur,
                opacity: opacity
            };
        };

        const changeSlide = async (direction) => {
            if (transitioning.value) return;
            transitioning.value = true;

            setTimeout(() => {
                active.value = (active.value + direction + products.value.length) % products.value.length;
                emit("select-product", products.value[active.value]);
                transitioning.value = false;
            }, 500);
        };

        const nextSlide = () => changeSlide(1);
        const prevSlide = () => changeSlide(-1);

        return {
            products,
            active,
            transitioning,
            getSlideStyle,
            nextSlide,
            prevSlide,
        };
    },
};
</script>

<style scoped>
.slider {
    position: relative;
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(145deg, #0f2027, #203a43, #2c5364);
}

.item {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    width: 340px;
    height: 400px;
    backdrop-filter: blur(12px);
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: 0.5s ease-in-out;
    background-color: rgba(0, 0, 0, 0.2);
}

/* Genre Tag */
.genre-tag {
    background: linear-gradient(90deg, #ff416c, #ff4b2b);
    color: white;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 12px;
    position: absolute;
    top: 12px;
    left: 12px;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Title Styling */
.card-title {
    font-size: 24px;
    font-weight: bold;
    color: #ffe600;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}

/* Description Styling */
.card-description {
    font-size: 15px;
    margin-top: 8px;
    opacity: 0.95;
    color: #e0e0e0;
}

/* Price Styling */
.card-price {
    font-size: 20px;
    font-weight: bold;
    margin-top: 12px;
    color: #00ffcc;
}

/* Buttons */
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: absolute;
    bottom: 20px;
}

.nav-btn,
.cart-btn {
    background: rgba(0, 119, 255, 0.6);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
    font-size: 22px;
    padding: 12px;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-btn:hover,
.cart-btn:hover {
    background: rgba(0, 119, 255, 0.85);
    transform: scale(1.12);
}

/* Disabled Button */
.nav-btn:disabled {
    background: rgba(0, 119, 255, 0.3);
    cursor: not-allowed;
    transform: none;
    opacity: 0.5;
}
</style>
