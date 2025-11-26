// src/composables/useApi.js
import { ref } from 'vue';

export function useApi(baseUrl = 'http://localhost:3000') {
  const loading = ref(false);
  const error = ref(null);

  async function request(path, options = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || `Error ${response.status}`);
      }

      return data;
    } catch (err) {
      console.error('Error en useApi:', err);
      error.value = err.message || 'Error inesperado';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  const get = (path) => request(path, { method: 'GET' });
  const post = (path, body) => request(path, { method: 'POST', body });
  const put = (path, body) => request(path, { method: 'PUT', body });
  const del = (path) => request(path, { method: 'DELETE' });

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
}
