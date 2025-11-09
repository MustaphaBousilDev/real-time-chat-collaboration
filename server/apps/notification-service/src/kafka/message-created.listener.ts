import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NotificationService } from '../notification-service.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MessageListener {
  constructor(private readonly notificationService: NotificationService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @OnEvent('message.created')
  handleMessageCreated(@Payload() message: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.notificationService.sendNotification({
      type: 'message',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: message,
    });
  }
}
