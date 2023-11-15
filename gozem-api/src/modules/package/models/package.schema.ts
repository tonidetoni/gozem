import { model, Model, Schema } from 'mongoose';
import { IPackageDocument } from '@modules/package/interfaces/package.interface';
import {ObjectId} from "mongodb";

const locationSchema: Schema = new Schema(
  {
    lat: Number,
    lng: Number
  },
  { _id: false }
);

const packageSchema: Schema = new Schema(
  {
    package_id: { type: String, unique: true },
    active_delivery_id: { type: ObjectId, ref: 'delivery'},
    description: String,
    weight: Number,
    height: Number,
    depth: Number,
    from_name: String,
    from_address: String,
    from_location: locationSchema,
    to_name: String,
    to_address: String,
    to_location: locationSchema
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        return { id: ret._id, ...ret };
      }
    }
  }
);

export const PackageModel: Model<IPackageDocument> = model<IPackageDocument>('package', packageSchema, 'packages');
