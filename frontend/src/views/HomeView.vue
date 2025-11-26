<template>
  <div class="page">
    <h2>MercApp - Catálogo</h2>

    <section class="filters">
    
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategory">
        <option value="all">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
    </section>

    <router-link to="/product/new" class="btn primary">+ Crear Producto</router-link>

    <section v-if="loading" class="status">
      Cargando productos...
    </section>

    <section v-else-if="error" class="status error">
      Ocurrió un error: {{ error }}
      <button @click="reload">Reintentar</button>
    </section>

    <section v-else>
      <p v-if="filteredProducts.length === 0" class="status">
        No se encontraron productos con los filtros actuales.
      </p>

      <div v-else class="grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue';
import { useProducts } from '../composables/useProducts';

const {
  loading,
  error,
  categories,
  search,
  selectedCategory,
  filteredProducts,
  reload,
} = useProducts();

function handleAddToCart(product) {
  // Temporalmente solo mostramos en consola.
  // Luego lo conectamos con el carrito real.
  console.log('Agregar al carrito:', product);
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.filters input {
  flex: 1 1 240px;
  padding: 0.4rem 0.6rem;
}

.filters select {
  min-width: 200px;
  padding: 0.4rem 0.6rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.status {
  margin-top: 1rem;
}

.status.error {
  color: #b91c1c;
}
</style>
