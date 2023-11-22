import { string, z } from 'zod';

export const createPackageValidator = z
  .object({
    description: z.string(),
    weight: z.number(),
    height: z.number(),
    depth: z.number(),
    from_name: z.string().optional(),
    from_address: z.string().optional(),
    from_location: z
      .object({
        lat: z.number(),
        lng: z.number()
      })
      .optional(),
    to_name: z.string().optional(),
    to_address: z.string().optional(),
    to_location: z
      .object({
        lat: z.number(),
        lng: z.number()
      })
      .optional()
  })
  .strict({ message: 'Unsupported property' });

export const updatePackageValidator = z
  .object({
    id: z.string(),
    active_delivery_id: z.string().optional(),
    description: z.string().optional(),
    weight: z.string().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
    from_name: z.string().optional(),
    from_address: z.string().optional(),
    from_location: z
      .object({
        lat: z.number(),
        lng: z.number()
      })
      .optional(),
    to_name: z.string().optional(),
    to_address: z.string().optional(),
    to_location: z
      .object({
        lat: z.number(),
        lng: z.number()
      })
      .optional()
  })
  .strict({ message: 'Unsupported property' });

export const getAllPackagesValidator = z
  .object({
    limit: z.string().optional().default('20'),
    page: z.string().optional().default('1'),
    count: z.string().optional()
  })
  .strict({ message: 'Unsupported property' });
