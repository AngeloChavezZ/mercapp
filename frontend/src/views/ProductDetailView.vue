<template>
  <div class="detail-container" v-if="!loading && product">
    <h1>{{ product.name }}</h1>

     <router-link :to="`/product/${product.id}/edit`" class="btn secondary">
      Editar
    </router-link>

    <div class="detail-content">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />

      <div class="detail-info">
        <p class="price">Precio: $ {{ product.price }}</p>
        <p class="desc">{{ product.description }}</p>
        <p class="stock">Stock disponible: {{ product.stock }}</p>

        <button class="btn" @click="addToCart(product)">
          Agregar al carrito
        </button>
      </div>
    </div>

    <router-link to="/" class="back">← Volver al catálogo</router-link>
  </div>

  <div v-else-if="loading" class="loading">Cargando producto...</div>

  <div v-else class="error-box">
    <p>{{ error }}</p>
    <router-link to="/" class="back">← Volver al catálogo</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '../composables/useCart';

const route = useRoute();
const { addToCart } = useCart();

const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;

    // 🔥 Llamada directa al backend — evita el error de "<!doctype"
    const res = await fetch(`http://localhost:3000/api/products/${id}`);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Producto no encontrado');
      }
      throw new Error('No se pudo cargar el producto.');
    }

    // Aquí llega JSON correcto — ya confirmado
    product.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = err.message || 'Error al cargar el producto.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.detail-content {
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}

.detail-image {
  width: 320px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.detail-info {
  max-width: 350px;
  text-align: left;
}

.price {
  font-size: 24px;
  color: #222;
  margin-bottom: 10px;
}

.desc {
  margin-bottom: 15px;
}

.stock {
  font-weight: bold;
  margin-bottom: 20px;
}

.btn {
  background: #4638f5;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}

.btn:hover {
  background: #352ac8;
}

.back {
  margin-top: 25px;
  display: inline-block;
  color: #4638f5;
}

.error-box {
  max-width: 700px;
  padding: 20px;
  margin: 30px auto;
  background: #ffd6d6;
  color: #900;
  border-radius: 10px;
  text-align: center;
}
</style>
