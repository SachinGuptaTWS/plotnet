export type PlotStatus = 'AVAILABLE' | 'BOOKED' | 'RESERVED';

export interface Plot {
  id: number;
  title: string;
  location: string;
  area: number;
  price: number;
  status: PlotStatus;
  description: string;
  imageUrl?: string;
  createdAt: string;
}
