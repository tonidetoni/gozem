import {Package} from "../package-create/package";

export type Location = {
  lat: number
  lng: number
}
export interface Delivery {
  package_id: string
  id?: string
  delivery_id?: string
  location?: Location
  status?: string
  pickup_time?: Date,
  start_time?: Date
  end_time?: Date
  package?: Package
}
