/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodRequestValidationError } from '@global/helpers/error-handler';
import { Request } from 'express';
import { ZodIssue } from 'zod';

type IZodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export function zodValidator(schema: any): IZodDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const result = schema.safeParse({ ...req.body, ...req.params, ...req.query });
      if (!result.success) {
        const error = result.error.flatten((issue: ZodIssue) => ({
          message: issue.message,
          field: issue.path
        }));
        const customError = [Object.values(error.fieldErrors).flat(), Object.values(error.formErrors).flat()];
        throw new ZodRequestValidationError(JSON.stringify(customError));
      }

      return originalMethod.apply(this, [{ ...req, data: result.data }, args[1]], result.data);
    };
    return descriptor;
  };
}
