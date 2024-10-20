export interface Actor {
  id: string;
  name: string;
  role: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActorCreateInput {
  name: string;
  role: string;
  walletAddress: string;
}

export interface ActorUpdateInput {
  name?: string;
  role?: string;
  walletAddress?: string;
}
