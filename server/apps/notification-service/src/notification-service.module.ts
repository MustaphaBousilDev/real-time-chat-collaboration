import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification-service.service';
import { NotificationEvents } from './kafka/notification.events';
import { MessageCreatedListener } from 'apps/message-service/src/kafka/message-created.listener';
import { UserCreatedListener } from './kafka/user-created.listener';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    NotificationService,
    NotificationEvents,
    MessageCreatedListener,
    UserCreatedListener,
  ],
})
export class NotificationServiceModule {}
