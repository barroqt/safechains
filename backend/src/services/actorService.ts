import prisma from "../lib/prisma";
import { Actor, ActorCreateInput, ActorUpdateInput } from "../types/actor";

export const getAllActors = async (): Promise<Actor[]> => {
  return prisma.actor.findMany();
};

export const getActorById = async (id: string): Promise<Actor | null> => {
  return prisma.actor.findUnique({ where: { id } });
};

export const createActor = async (data: ActorCreateInput): Promise<Actor> => {
  return prisma.actor.create({ data });
};

export const updateActor = async (
  id: string,
  data: ActorUpdateInput
): Promise<Actor> => {
  return prisma.actor.update({
    where: { id },
    data,
  });
};

export const deleteActor = async (id: string): Promise<Actor> => {
  return prisma.actor.delete({ where: { id } });
};
