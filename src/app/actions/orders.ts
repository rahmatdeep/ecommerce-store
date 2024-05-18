"use server";

import prisma from "@/db/db";

export async function userOrderExsist(email: string, productId: string) {
  return (
    (await prisma.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
}
