<template>
  <div class="app">
    <header class="topbar">
      <router-link to="/" class="logo">MercApp</router-link>

      <router-link to="/cart" class="cart-link">
        Carrito ({{ cartCount }})
      </router-link>
    </header>

    <main class="main-content">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <div class="loading">Cargando vista...</div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useCart } from "@/composables/useCart";

const { cartCount } = useCart();
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

.cart-link {
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
}

.main-content {
  padding: 30px 60px;
}
</style>
