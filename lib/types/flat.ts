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
}

export interface CreateFlatDto {
  name: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Vacant' | 'Occupied';
  note?: string;
}

export type UpdateFlatDto = Partial<CreateFlatDto>;
