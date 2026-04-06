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
  /** Listing / project RERA; optional. Must be unique across plots and user accounts. */
  reraNumber?: string | null;
  createdAt: string;
}
