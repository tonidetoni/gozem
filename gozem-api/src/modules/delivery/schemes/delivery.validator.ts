import { z } from 'zod';
import { Location } from '@modules/package/interfaces/package.interface';
import { Status } from '@modules/delivery/interfaces/delivery.interface';

export const createDeliveryValidator = z
  .object({
    package_id: z.string().trim().min(1, { message: 'Required' })
  })
  .strict({ message: 'Unsupported property' });

export const updateDeliveryValidator = z.object({
  status: z.enum(['open', 'picked-up', 'in-transit', 'failed', 'delivered']),
  pickup_time: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  location: z
    .object({
      lat: z.number(),
      lng: z.number()
    })
    .optional()
});

export const getAllDeliveriesValidator = z.object({
  limit: z.string().optional().default('20'),
  page: z.string().optional().default('1'),
  count: z.string().optional()
});
