import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TResult } from 'src/common/types';
import { NotificationEntity } from 'src/entities/notification.entity';
import { Repository } from 'typeorm';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) { }

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

  async update(payload: UpdateNotificationDto, id: number) {
    const notification = await this.notificationRepository.findOneBy({ id });

    if (!notification) throw new NotFoundException();

    await this.notificationRepository.update(id, payload);

    return { statusCode: 200, message: 'success' } as TResult;
  }

  async updateAllSeen(userId: number) {
    const notifyList = await this.notificationRepository.findBy({
      isSeen: false,
      userId
    });

    if (!notifyList.length) return;

    await Promise.all(
      notifyList.map(async (item) => {
        await this.notificationRepository.update(
          { id: item.id },
          { isSeen: true },
        );
      }),
    );

    return { message: 'success' };
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
