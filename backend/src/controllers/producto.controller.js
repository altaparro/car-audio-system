import * as productoService from "../services/producto.service.js";

export const getProductos = async (req, res) => {
  try {
    const data = await productoService.obtenerProductos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const data = await productoService.crearProducto(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const getPreciosProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productoService.obtenerPreciosPorProducto(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al calcular precios" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoService.actualizarProducto(id, req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoService.eliminarProducto(id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};