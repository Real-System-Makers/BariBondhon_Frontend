export interface House {
  _id: string;
  waterBill: number;
  gasBill: number;
  user: string;
  division?: string;
  district?: string;
  policeStation?: string;
  address?: string;
  registrationNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateHouseDto {
  waterBill?: number;
  gasBill?: number;
  division?: string;
  district?: string;
  policeStation?: string;
  address?: string;
  registrationNumber?: string;
}
