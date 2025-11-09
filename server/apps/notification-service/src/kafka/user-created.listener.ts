import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../notification-service.service';

@Injectable()
export class UserCreatedListener {
  constructor(private readonly notificationService: NotificationService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @OnEvent('user.created')
  handleUserCreated(user: any) {
    // Send a welcome notification when a new user is created
    this.notificationService.sendNotification({
      type: 'welcome',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: user,
    });
  }
}
