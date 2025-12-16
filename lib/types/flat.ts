export interface Flat {
  _id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Vacant' | 'Occupied';
  note?: string;
  tenant?: {
    _id: string;
    name: string;
    email: string;
  };
  user?: {
    _id?: string;
    name: string;
    phone?: string;
    email?: string;
  };
  // Electricity tracking
  previousElectricityReading?: number;
  currentElectricityReading?: number;
  electricityRatePerUnit?: number;
  lastElectricityUpdateDate?: string;
}

export interface CreateFlatDto {
  name: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Vacant' | 'Occupied';
  note?: string;
}

export type UpdateFlatDto = Partial<CreateFlatDto> & {
  tenant?: string | null;
};

export interface UpdateElectricityDto {
  currentReading: number;
  ratePerUnit?: number;
}

export interface BatchUpdateElectricityDto {
  updates: { flatId: string; currentReading: number }[];
}
