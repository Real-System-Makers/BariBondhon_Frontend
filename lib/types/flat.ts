export interface Flat {
  _id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Vacant' | 'Occupied';
}

export interface CreateFlatDto {
  name: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'Vacant' | 'Occupied';
}
