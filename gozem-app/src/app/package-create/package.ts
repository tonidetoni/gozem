import {Delivery, Location} from "../delivery-create/delivery";

export interface Package {
  id?: string
  package_id?: string
  description: string;
  weight: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  to_name: string;
  to_address: string;
  to_location?: Location;
  from_location?: Location
  delivery?: Delivery
}

export type Query = {
  limit?: number
  page?: number
}
