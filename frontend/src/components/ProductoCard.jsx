import { useState } from "react";

export default function ProductoCard({ producto }) {
  const [editing, setEditing] = useState(false);
  const [precio, setPrecio] = useState(producto.precio_base);
  const [stock, setStock] = useState(producto.stock);

  const eliminar = async () => {
    await fetch(`http://localhost:3000/api/productos/${producto.id}`, {
      method: "DELETE"
    });
    location.reload();
  };

  const guardar = async () => {
    await fetch(`http://localhost:3000/api/productos/${producto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        precio_base: Number(precio),
        stock: Number(stock)
      })
    });

    setEditing(false);
    location.reload();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border">
      <h2 className="text-xl font-semibold">{producto.nombre}</h2>
      <p className="text-gray-500">{producto.marca}</p>

      {editing ? (
        <>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-1 w-full mt-2 rounded"
            placeholder="Precio"
          />
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-1 w-full mt-2 rounded"
            placeholder="Stock"
          />
        </>
      ) : (
        <>
          <p className="text-green-600 text-xl font-bold mt-2">
            ${producto.precio_base}
          </p>
          <p className="text-sm text-gray-500">
            Stock: {producto.stock}
          </p>
        </>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {editing ? (
          <button
            onClick={guardar}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Editar
          </button>
        )}

        <button
          onClick={eliminar}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>

        <a
          href={`/productos/${producto.id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Ver precios
        </a>
      </div>
    </div>
  );
}