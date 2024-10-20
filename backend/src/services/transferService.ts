import prisma from "../lib/prisma";
import {
  Transfer,
  TransferCreateInput,
  TransferUpdateInput,
} from "../types/transfer";

export const getAllTransfers = async (): Promise<Transfer[]> => {
  return prisma.transfer.findMany();
};

export const getTransferById = async (id: string): Promise<Transfer | null> => {
  return prisma.transfer.findUnique({ where: { id } });
};

export const createTransfer = async (
  data: TransferCreateInput
): Promise<Transfer> => {
  return prisma.transfer.create({
    data: {
      ...data,
      status: "PENDING",
      timestamp: new Date(),
    },
  });
};

export const updateTransfer = async (
  id: string,
  data: TransferUpdateInput
): Promise<Transfer> => {
  return prisma.transfer.update({
    where: { id },
    data,
  });
};

export const deleteTransfer = async (id: string): Promise<Transfer> => {
  return prisma.transfer.delete({ where: { id } });
};

export const getTransfersByProduct = async (
  productId: string
): Promise<Transfer[]> => {
  return prisma.transfer.findMany({ where: { productId } });
};

export const getTransfersByActor = async (
  actorId: string
): Promise<Transfer[]> => {
  return prisma.transfer.findMany({
    where: {
      OR: [{ fromActorId: actorId }, { toActorId: actorId }],
    },
  });
};
