import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BASE_API_URL } from 'src/common/constants';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';
import { Roles } from 'src/metadata/auth.metadata';
import { ROLE } from 'src/common/enums';

@Controller(`${BASE_API_URL}/notification`)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Roles(ROLE.USER, ROLE.SUPER_ADMIN)
  @Get()
  list(@Req() req) {
    return this.notificationService.listByUserId(req.userId);
  }

  @Put(':id')
  update(@Body() payload: UpdateNotificationDto, @Param('id') id: number) {
    return this.notificationService.update(payload, id);
  }

  @Roles(ROLE.USER, ROLE.SUPER_ADMIN)
  @Post('update-seen')
  updateAllSeen(@Req() req) {
    return this.notificationService.updateAllSeen(req.user);
  }

  @Post()
  create(@Body() payload: CreateNotificationDto, userId: number) {
    return this.notificationService.create(payload, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notificationService.delete(id);
  }
}
