import { Module } from '@nestjs/common';
import { MessageController } from './message-service.controller';
import { MessageService } from './message-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageEvents } from './kafka/message.events';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageEvents, MessageRepository],
})
export class MessageServiceModule {}
