import { PipeTransform, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}
  async transform(value: unknown) {
    z.config(z.locales['en'] as Partial<z.core.$ZodConfig>);
    try {
      return await this.schema.parseAsync(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
