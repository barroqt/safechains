import prisma from "../lib/prisma";
import {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
} from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return prisma.product.findUnique({ where: { id } });
};

export const createProduct = async (
  data: ProductCreateInput
): Promise<Product> => {
  return prisma.product.create({ data });
};

export const updateProduct = async (
  id: string,
  data: ProductUpdateInput
): Promise<Product> => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string): Promise<Product> => {
  return prisma.product.delete({ where: { id } });
};

export const getProductsByManufacturer = async (
  manufacturerId: string
): Promise<Product[]> => {
  return prisma.product.findMany({ where: { manufacturerId } });
};

export const getProductsByOwner = async (
  ownerId: string
): Promise<Product[]> => {
  return prisma.product.findMany({ where: { ownerId } });
};
