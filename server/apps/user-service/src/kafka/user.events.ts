import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserEvents {
  constructor(private readonly kafkaClient: ClientKafka) {}

  emitUserCreated(user: any) {
    this.kafkaClient.emit('user.created', user);
  }

  emitUserUpdated(user: any) {
    this.kafkaClient.emit('user.updated', user);
  }

  emitUserDeleted(userId: string) {
    this.kafkaClient.emit('user.deleted', userId);
  }
}
