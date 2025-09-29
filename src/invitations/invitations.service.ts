import { Injectable } from '@nestjs/common';
import type {
  CreateInvitationDto,
  UpdateInvitationDto,
} from './dto/invitation.dto';

@Injectable()
export class InvitationsService {
  create(createInvitationDto: CreateInvitationDto) {
    return 'This action adds a new invitation';
  }

  findAll() {
    return `This action returns all invitations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
