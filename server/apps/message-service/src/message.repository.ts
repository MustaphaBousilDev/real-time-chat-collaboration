import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository {
  create(messageData: any) {
    console.log(messageData);
  }

  findById(messageId: string) {
    console.log(messageId);
  }
}
