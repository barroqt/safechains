export interface Product {
  id: string;
  name: string;
  description: string;
  nftId: string;
  manufacturerId: string;
  currentStatus: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreateInput {
  name: string;
  description: string;
  nftId: string;
  manufacturerId: string;
  currentStatus: string;
  ownerId: string;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  nftId?: string;
  manufacturerId?: string;
  currentStatus?: string;
  ownerId?: string;
}
