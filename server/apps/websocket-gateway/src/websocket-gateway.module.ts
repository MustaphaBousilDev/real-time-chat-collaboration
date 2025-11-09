import { Module } from '@nestjs/common';
import { WebsocketGatewayController } from './websocket-gateway.controller';
import { WebsocketGatewayService } from './websocket-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [WebsocketGatewayController],
  providers: [WebsocketGatewayService],
})
export class WebsocketGatewayModule {}
