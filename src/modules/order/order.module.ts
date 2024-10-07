import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { MailModule } from '../mail/mail.module';
import { ChatGateway } from 'src/chat/chat.gateway';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), MailModule, NotificationModule],
  controllers: [OrderController],
  providers: [OrderService, ChatGateway],
})
export class OrderModule {}
