export interface House {
  _id: string;
  waterBill: number;
  gasBill: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateHouseDto {
  waterBill?: number;
  gasBill?: number;
}
