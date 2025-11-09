import { Injectable } from '@nestjs/common';
import { NotificationEvents } from './kafka/notification.events';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationEvents: NotificationEvents) {}

  sendNotification(notificationData: any) {
    // Implement the logic to send the notification (e.g., email, push notification)
    console.log('Sending notification:', notificationData);
    // Emit a notification sent event
    this.notificationEvents.emitNotificationSent(notificationData);
  }
}
