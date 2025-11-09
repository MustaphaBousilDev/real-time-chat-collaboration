import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationEvents {
  constructor(private readonly kafkaClient: ClientKafka) {}

  emitNotificationSent(notificationData: any) {
    this.kafkaClient.emit('notification.sent', notificationData);
  }
}
