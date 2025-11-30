// src/routes/products.routes.js
const express = require('express');
const router = express.Router();
const { readJson, writeJson } = require('../utils/fileDb');

const PRODUCTS_FILE = 'products.json';
const CATEGORIES_FILE = 'categories.json';

// Helpers para leer / guardar
function getProducts() {
  return readJson(PRODUCTS_FILE);
}

function saveProducts(list) {
  writeJson(PRODUCTS_FILE, list);
}

function getCategories() {
  return readJson(CATEGORIES_FILE);
}

// ===== VALIDACIÓN DE PRODUCTO =====
function validateProduct(body, isUpdate = false) {
  const errors = [];

  const requiredFields = ['name', 'price', 'categoryId', 'stock', 'imageUrl'];

  if (!isUpdate) {
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`El campo '${field}' es obligatorio.`);
      }
    }
  }

  // price y stock deben ser números correctos
  const price = body.price !== undefined ? Number(body.price) : undefined;
  const stock = body.stock !== undefined ? Number(body.stock) : undefined;

  if (price !== undefined && (Number.isNaN(price) || price <= 0)) {
    errors.push('El precio debe ser un número mayor que 0.');
  }

  if (stock !== undefined && (Number.isNaN(stock) || stock < 0)) {
    errors.push('El stock debe ser un número mayor o igual a 0.');
  }

  // categoryId: string ('face', 'body', 'relax', 'kits')
  if (body.categoryId !== undefined) {
    const categories = getCategories();
    const exists = categories.some((c) => c.id === body.categoryId);
    if (!exists) {
      errors.push('La categoría indicada no existe.');
    }
  }

  if (body.imageUrl !== undefined) {
    const isValidUrl = /^https?:\/\/.+/i.test(body.imageUrl) || body.imageUrl.startsWith('/');
    if (!isValidUrl) {
      errors.push('La URL de la imagen no es válida.');
    }
  }

  return errors;
}

// ===== ENDPOINTS =====

// GET /api/products
router.get('/', (req, res) => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const productId = Number(req.params.id);

    const product = products.find((p) => Number(p.id) === productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto por id:', error);
    res.status(500).json({ message: 'Error al obtener producto' });
  }
});

// POST /api/products
router.post('/', (req, res) => {
  try {
    const body = req.body;
    const errors = validateProduct(body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const products = getProducts();
    const newId = products.length ? Math.max(...products.map((p) => Number(p.id))) + 1 : 1;

    const newProduct = {
      id: newId,
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      imageUrl: body.imageUrl,
      categoryId: body.categoryId, // string: 'face', 'body', etc.
      stock: Number(body.stock)
    };

    products.push(newProduct);
    saveProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  updateProduct(req, res, false);
});

// PATCH /api/products/:id
router.patch('/:id', (req, res) => {
  updateProduct(req, res, true);
});

function updateProduct(req, res, isPartial) {
  try {
    const products = getProducts();
    const productId = Number(req.params.id);
    const index = products.findIndex((p) => Number(p.id) === productId);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const body = req.body;
    const errors = validateProduct(body, true);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const current = products[index];

    const updated = {
      ...current,
      ...body,
      price: body.price !== undefined ? Number(body.price) : current.price,
      stock: body.stock !== undefined ? Number(body.stock) : current.stock,
      categoryId: body.categoryId !== undefined ? body.categoryId : current.categoryId
    };

    products[index] = updated;
    saveProducts(products);

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
}

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  try {
    const products = getProducts();
    const productId = Number(req.params.id);
    const index = products.findIndex((p) => Number(p.id) === productId);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const deleted = products.splice(index, 1)[0];
    saveProducts(products);

    res.json({ message: 'Producto eliminado', product: deleted });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;
