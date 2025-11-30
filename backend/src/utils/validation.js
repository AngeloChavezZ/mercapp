// src/utils/validation.js

function validateProduct(payload) {
  const errors = [];

  if (!payload.name || typeof payload.name !== 'string') {
    errors.push('name es obligatorio y debe ser texto');
  }
  if (!payload.description || typeof payload.description !== 'string') {
    errors.push('description es obligatorio y debe ser texto');
  }
  if (payload.price == null || isNaN(Number(payload.price)) || Number(payload.price) <= 0) {
    errors.push('price debe ser numérico > 0');
  }
  if (!payload.categoryId) {
    errors.push('categoryId es obligatorio');
  }
  if (payload.stock == null || isNaN(Number(payload.stock)) || Number(payload.stock) < 0) {
    errors.push('stock debe ser numérico ≥ 0');
  }
  if (!payload.imageUrl || typeof payload.imageUrl !== 'string') {
    errors.push('imageUrl es obligatoria');
  }

  return errors;
}

module.exports = {
  validateProduct,
};
