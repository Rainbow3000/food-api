import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('notification')
export class NotificationEntity extends BaseEntity {
  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;

  @Column({ type: 'varchar', nullable: true })
  content: string;

  @Column({ type: 'boolean', name: 'is_seen', default: false })
  isSeen: boolean;

  @Column({ type: 'json', nullable: true })
  data: unknown;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
