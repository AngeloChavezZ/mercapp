// src/composables/useProducts.js
import { ref, computed, onMounted } from 'vue';
import { useApi } from './useApi';

export function useProducts() {
  const { loading, error, get } = useApi('http://localhost:3000');

  const products = ref([]);
  const categories = ref([]);
  const search = ref('');
  const selectedCategory = ref('all');

  async function loadData() {
    try {
      const [productsData, categoriesData] = await Promise.all([
        get('/api/products'),
        get('/api/categories'),
      ]);

      products.value = productsData;
      categories.value = categoriesData;
    } catch (err) {
      // el error ya se guarda en error.value por useApi
    }
  }

  const filteredProducts = computed(() => {
    const term = search.value.trim().toLowerCase();

    return products.value.filter((p) => {
      const matchesCategory =
        selectedCategory.value === 'all' ||
        p.categoryId === selectedCategory.value;

      const matchesSearch =
        term === '' ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  });

  onMounted(loadData);

  return {
    loading,
    error,
    products,
    categories,
    search,
    selectedCategory,
    filteredProducts,
    reload: loadData,
  };
}
