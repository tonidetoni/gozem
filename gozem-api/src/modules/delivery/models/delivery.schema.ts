import { model, Model, Schema } from 'mongoose';
import { IDeliveryDocument } from '@modules/delivery/interfaces/delivery.interface';
import { ObjectId } from 'mongodb';

const locationSchema: Schema = new Schema(
  {
    lat: Number,
    lng: Number
  },
  { _id: false }
);

const deliverySchema: Schema = new Schema(
  {
    delivery_id: { type: String, unique: true },
    package_id: { type: ObjectId, ref: 'package' },
    pickup_time: Date,
    start_time: Date,
    end_time: Date,
    location: locationSchema,
    status: { type: String, enum: ['open', 'picked-up', 'in-transit', 'failed', 'delivered'] }
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

export const DeliveryModel: Model<IDeliveryDocument> = model<IDeliveryDocument>('delivery', deliverySchema, 'deliveries');
