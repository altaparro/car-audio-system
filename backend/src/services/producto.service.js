import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerProductos = async () => {
  return prisma.producto.findMany({
    where: { activo: true }
  });
};

export const crearProducto = async (data) => {
  return prisma.producto.create({
    data
  });
};

export const obtenerPreciosPorProducto = async (id) => {
  const producto = await prisma.producto.findUnique({
    where: { id }
  });

  const tiposPago = await prisma.tipoPago.findMany({
    where: { activo: true }
  });

  const precios = tiposPago.map(tp => {
    const precioFinal =
      producto.precio_base +
      (producto.precio_base * tp.recargo_porcentaje) / 100;

    return {
      tipo: tp.nombre,
      precio: Math.round(precioFinal)
    };
  });

  return {
    producto: producto.nombre,
    precio_base: producto.precio_base,
    precios
  };
};

export const actualizarProducto = async (id, data) => {
  return prisma.producto.update({
    where: { id },
    data
  });
};

export const eliminarProducto = async (id) => {
  return prisma.producto.update({
    where: { id },
    data: {
      activo: false
    }
  });
};