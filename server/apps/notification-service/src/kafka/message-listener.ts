import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class MessageListener {
  @MessagePattern('message.created')
  handleMessageCreated(@Payload() message: any) {
    console.log('New message created:', message);
  }
}
