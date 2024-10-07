import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TResult } from 'src/common/types';
import { NotificationEntity } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async listByUserId(userId: number) {
    const notifications = await this.notificationRepository.find({
      where: {
        userId,
      },
      order: {
        id: 'DESC',
      },
    });

    return {
      statusCode: 200,
      message: 'Lấy danh sách thông báo thành công',
      data: notifications,
    } as TResult;
  }

  async create(payload: CreateNotificationDto, userId: number) {
    await this.notificationRepository.insert({ ...payload, userId });

    return { statusCode: 201, message: 'Tạo thông báo thành công' } as TResult;
  }

  async delete(id: number) {
    await this.notificationRepository.softDelete(id);

    return { statusCode: 200, message: 'Xóa thông báo thành công' } as TResult;
  }
}
