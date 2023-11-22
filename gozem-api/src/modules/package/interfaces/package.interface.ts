import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type Location = {
  lat: string;
  lng: string;
};
export interface IPackageDocument extends Document {
  _id: ObjectId;
  package_id: string;
  active_delivery_id: string;
  description: string;
  weight: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: Location;
  to_name: string;
  to_address: string;
  to_location: Location;
}

export interface PackageDto {
  active_delivery_id: string;
  description: string;
  weight: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  to_name: string;
  to_address: string;
  to_location: Location;
  from_location: Location;
}

export interface GetPackagesDto {
  limit: number;
  page: number;
  count: string | undefined;
}
