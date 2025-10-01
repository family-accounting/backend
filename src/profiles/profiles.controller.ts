import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { createProfileSchema, paramIdSchema, updateProfileSchema, type CreateProfileDto, type ParamId, type UpdateProfileDto } from './dto/profile.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Post()
  createOne(@Body(new ZodValidationPipe(createProfileSchema)) createProfileDto: CreateProfileDto) {
    return this.profilesService.createOne(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.profilesService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body(new ZodValidationPipe(updateProfileSchema)) updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateOneById(id, updateProfileDto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.profilesService.deleteOneById(id);
  }
}
