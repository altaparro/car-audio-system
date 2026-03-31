import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.tipoPago.createMany({
    data: [
      { nombre: "Efectivo", recargo_porcentaje: 0 },
      { nombre: "Transferencia", recargo_porcentaje: 0 },
      { nombre: "Débito", recargo_porcentaje: 10 },
      { nombre: "Crédito 1 pago", recargo_porcentaje: 15 },
      { nombre: "Crédito 3 pagos", recargo_porcentaje: 25 },
    ],
  });

  console.log("Tipos de pago cargados");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
