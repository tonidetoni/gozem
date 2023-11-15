import { GetPackagesDto, IPackageDocument, PackageDto } from '@modules/package/interfaces/package.interface';
import { generateRandomString } from '@global/helpers/helpers';
import { PackageModel } from '@modules/package/models/package.schema';
import { ObjectId } from 'mongodb';

class PackageService {
  public async createPackage(dto: PackageDto): Promise<IPackageDocument> {
    const package_id = await generateRandomString(8);

    return await PackageModel.create({
      ...dto,
      package_id
    });
  }

  public async updatePackage(id: string, dto: Partial<PackageDto>): Promise<IPackageDocument | null> {
    return PackageModel.findOneAndUpdate({ _id: id }, dto, { new: true });
  }

  public async getAllPackages(dto: GetPackagesDto): Promise<IPackageDocument[] | number> {
    const { limit = 20, page = 1, count = false } = dto;
    if (count) {
      return PackageModel.countDocuments();
    }
    const skip = (Number(page) - 1) * Number(limit);
    const allPackages = await PackageModel.find().limit(Number(limit)).skip(skip);
    return allPackages;
  }

  public async getByPackageId(package_id: string): Promise<IPackageDocument | null> {
    const p = await PackageModel.aggregate([
      {
        $match: { package_id }
      },
      {
        $lookup: {
          from: 'deliveries',
          localField: 'active_delivery_id',
          foreignField: '_id',
          as: 'delivery'
        },
      },
      {
        $unwind: {
          path: '$delivery',
          preserveNullAndEmptyArrays: true
        }
      },
    ])
    return p[0]
    // return PackageModel.findOne({ package_id }).lean();
  }

  public async deletePackage(id: string): Promise<number> {
    const query = await PackageModel.findByIdAndDelete(id);
    console.log('query', query);
    return 1;
  }
}

export const packageService = new PackageService();
