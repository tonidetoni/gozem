import { Request, Response } from 'express';
import { zodValidator } from '@global/decorators/zod-validation.decorators';
import { createDeliveryValidator, getAllDeliveriesValidator, updateDeliveryValidator } from '@modules/delivery/schemes/delivery.validator';
import { deliveryService } from '@service/database/delivery.service';
import { CreateDeliveryDto, GetAllDeliveriesDto, UpdateDeliveryDto } from '@modules/delivery/interfaces/delivery.interface';
import { StatusCodes } from 'http-status-codes';

class DeliveryController {
  @zodValidator(createDeliveryValidator)
  public async create(req: Request, res: Response): Promise<Response> {
    const delivery = await deliveryService.create(req.data as CreateDeliveryDto);
    return res.status(StatusCodes.CREATED).json(delivery);
  }

  @zodValidator(updateDeliveryValidator)
  public async update(req: Request, res: Response): Promise<Response> {
    const dto = req.data as Partial<UpdateDeliveryDto>;
    const delivery = await deliveryService.update(req.params.id, dto);
    return res.json(delivery);
  }

  @zodValidator(getAllDeliveriesValidator)
  public async getAllDeliveries(req: Request, res: Response): Promise<Response> {
    const deliveries = await deliveryService.getAllDeliveries(req.data as GetAllDeliveriesDto);
    return res.json(deliveries);
  }

  public async getByDeliveryId(req: Request, res: Response): Promise<Response> {
    const delivery = await deliveryService.getByDeliveryId(req.params.id);
    return res.json(delivery);
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    await deliveryService.deleteById(req.params.id);
    return res.json({ message: 'delivery_deleted' });
  }
}

export const deliveryController = new DeliveryController();
