import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BASE_API_URL } from 'src/common/constants';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';

@Controller(`${BASE_API_URL}/notification`)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  list(userId: number) {
    return this.notificationService.listByUserId(userId);
  }

  @Put(':id')
  update(@Body() payload: UpdateNotificationDto, @Param('id') id: number) {
    return this.notificationService.update(payload, id);
  }

  @Post('update-seen')
  updateAllSeen() {
    return this.notificationService.updateAllSeen();
  }

  @Post()
  create(@Body() payload: CreateNotificationDto, userId: number) {
    return this.notificationService.create(payload, userId);
  }

  @Delete()
  delete(userId: number) {
    return this.notificationService.delete(userId);
  }
}
