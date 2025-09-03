import { PipeTransform, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';
const fa = z.locales.fa();
z.config(fa);

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}
  async transform(value: unknown) {
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
