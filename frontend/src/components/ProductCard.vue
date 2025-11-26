<template>
  <article class="card">
    <img
      :src="product.imageUrl"
      :alt="product.name"
      class="card-image"
    />

    <h3 class="card-title">{{ product.name }}</h3>
    <p class="card-price">$ {{ Number(product.price).toFixed(2) }}</p>
    <p class="card-stock">Stock disponible: {{ product.stock }}</p>

    <p class="card-description">{{ product.description }}</p>

    <button class="btn primary" @click="handleAddToCart">
      Agregar al carrito
    </button>

    <router-link :to="`/product/${product.id}`" class="btn secondary">
      Ver detalle
    </router-link>

    <router-link :to="`/product/${product.id}/edit`" class="btn secondary">
      Editar
    </router-link>

    <button class="btn danger" @click="handleDelete">
      Eliminar
    </button>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import { useCart } from "@/composables/useCart";

const API_BASE = "http://localhost:3000/api";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { addToCart } = useCart();

const handleAddToCart = () => {
  addToCart(props.product);
};

const handleDelete = async () => {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  try {
    const res = await fetch(`${API_BASE}/products/${props.product.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Respuesta del backend al eliminar:", res.status);
      throw new Error("No se pudo eliminar");
    }

    alert("Producto eliminado correctamente");
    window.location.reload();
  } catch (error) {
    console.error("Error eliminando el producto:", error);
    alert("Error al eliminar producto");
  }
};
</script>

<style scoped>
.card {
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.card-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 10px;
}

.card-title {
  font-weight: 600;
  text-align: center;
}

.card-price {
  font-weight: 600;
}

.card-stock {
  font-size: 0.9rem;
  color: #6b7280;
}

.card-description {
  font-size: 0.9rem;
  color: #4b5563;
  text-align: center;
  min-height: 40px;
}

.btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  font-size: 0.9rem;
}

.btn.primary {
  background: #4f46e5;
  color: #fff;
}

.btn.secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn.danger {
  background: #dc2626;
  color: #fff;
}
</style>
