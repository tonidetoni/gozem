import {
  CreateDeliveryDto,
  GetAllDeliveriesDto,
  IDeliveryDocument,
  Status,
  UpdateDeliveryDto
} from '@modules/delivery/interfaces/delivery.interface';
import { DeliveryModel } from '@modules/delivery/models/delivery.schema';
import { generateRandomString } from '@global/helpers/helpers';
import {packageService} from "@service/database/package.service";

class DeliveryService {
  public async create(dto: CreateDeliveryDto): Promise<IDeliveryDocument> {
    const delivery_id = await generateRandomString(8);
    return DeliveryModel.create({
      delivery_id,
      status: Status.OPEN,
      ...dto
    });
  }

  public async update(id: string, dto: Partial<UpdateDeliveryDto>): Promise<IDeliveryDocument | null> {

    const delivery = await DeliveryModel.findOneAndUpdate({ _id: id }, dto, { new: true });
    if (dto.status === Status.PICKEDUP) {
      console.log()
      await packageService.updatePackage(String(delivery?.package_id), { active_delivery_id: String(delivery?._id) })
    }
    return delivery
  }

  public async getAllDeliveries(dto: GetAllDeliveriesDto): Promise<IDeliveryDocument[] | number> {
    const { limit = 20, page = 1, count = false } = dto;
    if (count) {
      return DeliveryModel.countDocuments();
    }
    const skip = (Number(page) - 1) * limit;
    // return DeliveryModel.find().populate('package', 'package_id').limit(Number(limit)).skip(skip);
    return DeliveryModel.aggregate([
      {
        $lookup: {
          from: 'packages',
          localField: 'package_id',
          foreignField: '_id',
          as: 'package'
        }
      },
      {
        $unwind: {
          path: '$package',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $limit: Number(limit)
      },
      {
        $skip: skip
      }
    ]);
  }

  public async getByDeliveryId(delivery_id: string): Promise<IDeliveryDocument | null> {
    // return DeliveryModel.findOne({ delivery_id }).populate('package_id').lean();
    const delivery = await DeliveryModel.aggregate([
      {
        $match: { delivery_id }
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'package_id',
          foreignField: '_id',
          as: 'package'
        }
      },
      {
        $unwind: {
          path: '$package',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    return { ...delivery[0], id: delivery[0]._id };
  }

  public async deleteById(id: string): Promise<void> {
    await DeliveryModel.deleteOne({ _id: id });
  }
}

export const deliveryService = new DeliveryService();
