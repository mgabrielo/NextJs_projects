import type { Category, Product, Date } from "@prisma/client";

export type CategoryProduct = Product & { date: Date[] };

export interface GetCategory {
  id: Category["id"];
  name: Category["name"];
  products: CategoryProduct[];
}
