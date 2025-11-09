import { Injectable } from '@nestjs/common';
import { MessageEvents } from './kafka/message.events';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private messageEvents: MessageEvents,
    private messageRepository: MessageRepository,
  ) {}

  createMessage(messageData: any) {
    const createdMessage = this.messageRepository.create(messageData);
    this.messageEvents.emitMessageCreated(createdMessage);
    return createdMessage;
  }

  getMessageById(messageId: string) {
    return this.messageRepository.findById(messageId);
  }
}
