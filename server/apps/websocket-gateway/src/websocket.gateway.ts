import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.kafkaClient.emit('message.created', payload);
    this.server.emit('message', payload);
  }
}
