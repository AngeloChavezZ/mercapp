<template>
  <main class="page cart-page">
    <h2>Carrito de compras</h2>

    <section v-if="cartItems.length === 0" class="empty">
      <p>Tu carrito está vacío.</p>
      <router-link to="/" class="btn primary">Volver al catálogo</router-link>
    </section>

    <section v-else class="cart-content">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td class="product-cell">
              <img :src="item.imageUrl" :alt="item.name" class="thumb" />
              <span>{{ item.name }}</span>
            </td>
            <td>$ {{ Number(item.price).toFixed(2) }}</td>
            <td>{{ item.quantity }}</td>
            <td>$ {{ (Number(item.price) * item.quantity).toFixed(2) }}</td>
            <td>
              <button class="btn danger" @click="removeFromCart(item.id)">
                Quitar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>Total de items: {{ cartCount }}</p>
        <p>Total a pagar: <strong>$ {{ cartTotal.toFixed(2) }}</strong></p>

        <button class="btn secondary" @click="clearCart">
          Vaciar carrito
        </button>
        <button class="btn primary" @click="checkoutDemo">
          Finalizar compra (demo)
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useCart } from "@/composables/useCart";

const { cartItems, cartCount, cartTotal, removeFromCart, clearCart } = useCart();

const checkoutDemo = () => {
  if (cartItems.value.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const total = Number(cartTotal.value).toFixed(2);

  alert(`Compra realizada en modo demo.\nTotal pagado: $ ${total}`);

  clearCart();
};
</script>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.empty {
  text-align: center;
  margin-top: 40px;
}

.cart-content {
  margin-top: 20px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.btn.primary {
  background: #4f46e5;
  color: white;
}

.btn.secondary {
  background: #e5e7eb;
}

.btn.danger {
  background: #dc2626;
  color: white;
}
</style>
