import express from "express";
import cors from "cors";

// IMPORTAR RUTAS
import productosRoutes from "../src/routes/producto.routes.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA (para ver que levanta)
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// RUTAS
app.use("/api/productos", productosRoutes);

export default app;