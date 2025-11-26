// src/composables/useCart.js
import { ref, computed } from "vue";

const STORAGE_KEY = "mercapp-cart";

// Cargar carrito desde localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error leyendo carrito de localStorage:", e);
    return [];
  }
}

const cart = ref(loadCart());

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value));
}

export function useCart() {
  const cartItems = computed(() => cart.value);

  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

  const addToCart = (product) => {
    const existing = cart.value.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }

    saveCart();
  };

  const removeFromCart = (productId) => {
    const index = cart.value.findIndex((p) => p.id === productId);
    if (index !== -1) {
      cart.value.splice(index, 1);
      saveCart();
    }
  };

  const clearCart = () => {
    cart.value = [];
    saveCart();
  };

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
