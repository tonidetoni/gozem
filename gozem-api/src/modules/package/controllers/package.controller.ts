import { Request, Response } from 'express';
import { zodValidator } from '@global/decorators/zod-validation.decorators';
import { createPackageValidator, getAllPackagesValidator, updatePackageValidator } from '@modules/package/schemes/package.validator';
import { GetPackagesDto, PackageDto } from '@modules/package/interfaces/package.interface';
import { packageService } from '@service/database/package.service';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '@global/helpers/error-handler';

class PackageController {
  @zodValidator(createPackageValidator)
  public async create(req: Request, res: Response): Promise<Response> {
    const dto: PackageDto = req.data as PackageDto;
    const newPackage = await packageService.createPackage(dto);
    return res.status(StatusCodes.CREATED).json(newPackage);
  }

  @zodValidator(updatePackageValidator)
  public async update(req: Request, res: Response): Promise<Response> {
    const dto = req.data as Partial<PackageDto>;
    const newPackage = await packageService.updatePackage(req.params.id, dto);
    if (!newPackage) throw new NotFoundError('package_not_found');
    return res.json(newPackage);
  }

  @zodValidator(getAllPackagesValidator)
  public async getAllPackages(req: Request, res: Response): Promise<Response> {
    const dto = req.data as GetPackagesDto;
    const allPackages = await packageService.getAllPackages(dto);
    return res.json(allPackages);
  }
  public async getByPackageId(req: Request, res: Response): Promise<Response> {
    const pack = await packageService.getByPackageId(req.params.id);
    if (!pack) throw new NotFoundError('package_not_found');
    return res.json(pack);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const result = await packageService.deletePackage(req.data?.id);
    return res.json(result);
  }
}

export const packageController = new PackageController();
