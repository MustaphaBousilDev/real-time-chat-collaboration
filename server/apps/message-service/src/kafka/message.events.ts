import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MessageEvents {
  constructor(private readonly kafkaClient: ClientKafka) {}

  emitMessageCreated(message: any) {
    this.kafkaClient.emit('message.created', message);
  }
}
