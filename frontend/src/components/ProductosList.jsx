import { useState } from "react";
import ProductoCard from "./ProductoCard";

export default function ProductosList({ productos }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio_base: "",
    stock: ""
  });

  // 👉 Crear producto
  const crearProducto = async () => {
    await fetch("http://localhost:3000/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...nuevo,
        precio_base: Number(nuevo.precio_base),
        stock: Number(nuevo.stock)
      })
    });

    location.reload();
  };

  // 👉 categorías únicas
  const categorias = [...new Set(productos.map(p => p.categoria))];

  // 👉 filtro
  const filtrados = productos.filter(p => {
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria = categoria
      ? p.categoria === categoria
      : true;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div>

      {/* BOTON AGREGAR */}
      <div className="p-4">
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar producto
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarForm && (
        <div className="bg-white p-4 shadow rounded m-4">
          <input
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={(e) =>
              setNuevo({ ...nuevo, nombre: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Marca"
            value={nuevo.marca}
            onChange={(e) =>
              setNuevo({ ...nuevo, marca: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Categoría"
            value={nuevo.categoria}
            onChange={(e) =>
              setNuevo({ ...nuevo, categoria: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Precio"
            value={nuevo.precio_base}
            onChange={(e) =>
              setNuevo({ ...nuevo, precio_base: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Stock"
            value={nuevo.stock}
            onChange={(e) =>
              setNuevo({ ...nuevo, stock: e.target.value })
            }
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={crearProducto}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      )}

      {/* FILTROS */}
      <div className="flex gap-4 p-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {filtrados.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>

    </div>
  );
}