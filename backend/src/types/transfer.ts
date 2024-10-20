export interface Transfer {
  id: string;
  productId: string;
  fromActorId: string;
  toActorId: string;
  transferMethod: "QR_CODE" | "CRYPTO_TRANSACTION";
  status: "PENDING" | "COMPLETED" | "FAILED";
  timestamp: Date;
}

export interface TransferCreateInput {
  productId: string;
  fromActorId: string;
  toActorId: string;
  transferMethod: "QR_CODE" | "CRYPTO_TRANSACTION";
  status: "PENDING" | "COMPLETED" | "FAILED";
}

export interface TransferUpdateInput {
  productId?: string;
  fromActorId?: string;
  toActorId?: string;
  transferMethod?: "QR_CODE" | "CRYPTO_TRANSACTION";
  status?: "PENDING" | "COMPLETED" | "FAILED";
}
