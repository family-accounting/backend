import { PipeTransform, BadRequestException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { z, ZodError } from 'zod';
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: z.ZodSchema,
    private readonly i18n: I18nService,
  ) {
    // Get current locale from i18n service
    const currentLocale = this.i18n.getSupportedLanguages
      ? this.i18n.getSupportedLanguages()[0]
      : 'en';
    z.config(z.locales[currentLocale] as Partial<z.core.$ZodConfig>);
  }

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
