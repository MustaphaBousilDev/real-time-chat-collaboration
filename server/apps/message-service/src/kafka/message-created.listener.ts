import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MessageCreatedListener {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @OnEvent('message.created')
  handleMessageCreated(message: any) {
    console.log('New message created:', message);
  }
}
