import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  async transform(value: unknown, _metadata: ArgumentMetadata) {
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
