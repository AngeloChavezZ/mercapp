<template>
  <form @submit.prevent="handleSubmit" class="form">

    <h2>{{ isEdit ? "Editar Producto" : "Crear Producto" }}</h2>

    <div class="field">
      <label>Nombre *</label>
      <input v-model="form.name" type="text" required />
    </div>

    <div class="field">
      <label>Precio *</label>
      <input v-model.number="form.price" type="number" min="0.01" step="0.01" required />
    </div>

   <div class="field">
  <label>Categoría *</label>
  <select v-model="form.categoryId" required>
    <option value="">Seleccione</option>
    <option 
      v-for="cat in categories"
      :key="cat.id"
      :value="cat.id"
    >
      {{ cat.name }}
    </option>
  </select>
</div>


    <div class="field">
      <label>Stock *</label>
      <input v-model.number="form.stock" type="number" min="0" required />
    </div>

    <div class="field">
      <label>URL de Imagen *</label>
      <input v-model="form.imageUrl" type="url" required />
    </div>

    <div class="field">
      <label>Descripción</label>
      <textarea v-model="form.description"></textarea>
    </div>

    <button class="btn primary" type="submit">
      {{ isEdit ? "Guardar Cambios" : "Crear Producto" }}
    </button>

    <router-link to="/" class="btn secondary">Cancelar</router-link>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const API_BASE = "http://localhost:3000/api";

const isEdit = route.name === "product-edit";

const categories = ref([]);

const form = reactive({
  name: "",
  price: 0,
  categoryId: "",
  stock: 0,
  imageUrl: "",
  description: ""
});

const loadCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Error al cargar categorías");

    categories.value = await res.json();
  } catch (err) {
    console.error("Error al cargar categorías:", err);
    alert("No se pudieron cargar las categorías");
  }
};

const loadProductIfEdit = async () => {
  if (!isEdit) return;

  try {
    const res = await fetch(`${API_BASE}/products/${route.params.id}`);
    if (!res.ok) throw new Error("No se pudo cargar el producto");

    const product = await res.json();
    Object.assign(form, product);
  } catch (err) {
    console.error("Error al cargar producto:", err);
    alert("No se pudo cargar el producto para edición");
  }
};

onMounted(async () => {
  await loadCategories();
  await loadProductIfEdit();
});

const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: form.categoryId // string: 'face', 'body', etc.
    };

    const url = isEdit
      ? `${API_BASE}/products/${route.params.id}`
      : `${API_BASE}/products`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let body = null;
      try {
        body = await res.json();
      } catch (_) {}
      console.error("Respuesta de error de la API:", res.status, body);
      throw new Error("Error al guardar producto");
    }

    await res.json();

    alert(isEdit ? "Producto actualizado correctamente" : "Producto creado correctamente");
    router.push("/");
  } catch (err) {
    console.error("Error al guardar producto:", err);
    alert("Error al guardar");
  }
};
</script>


<style scoped>
.form {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  margin-right: 10px;
}

.primary {
  background: #4f46e5;
  color: white;
  border: none;
}

.secondary {
  background: #e5e7eb;
  border: none;
}
</style>
