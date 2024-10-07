import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BASE_API_URL } from 'src/common/constants';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notification.dto';

@Controller(`${BASE_API_URL}/notification`)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  list(userId: number) {
    return this.notificationService.listByUserId(userId);
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
