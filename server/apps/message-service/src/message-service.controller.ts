import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message-service.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMessage(@Body() messageData: any) {
    return this.messageService.createMessage(messageData);
  }

  @Get(':id')
  getMessageById(@Param('id') messageId: string) {
    return this.messageService.getMessageById(messageId);
  }
}
