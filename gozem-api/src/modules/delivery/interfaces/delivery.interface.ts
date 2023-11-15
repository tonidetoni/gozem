import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { Location } from '@modules/package/interfaces/package.interface';

export enum Status {
  OPEN = 'open',
  INTRANSIT = 'in-transit',
  PICKEDUP = 'picked-up',
  FAILED = 'failed',
  DELIVERED = 'delivered'
}

export interface IDeliveryDocument extends Document {
  _id: ObjectId;
  delivery_id: string;
  package_id: string;
  pickup_time: Date;
  start_time: Date;
  end_time: Date;
  status: Status;
  location: Location;
}

export interface CreateDeliveryDto {
  package_id: string;
}

export interface UpdateDeliveryDto {
  status: Status;
  pickup_time: Date;
  start_time: Date;
  end_time: Date;
  location: Location;
}

export interface GetAllDeliveriesDto {
  limit: number;
  page: number;
  count: boolean;
}
