import { Router } from "express";
import {
  getProductos,
  crearProducto,
  getPreciosProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/producto.controller.js";

const router = Router();

router.get("/", getProductos);
router.post("/", crearProducto);
router.get("/:id/precios", getPreciosProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;