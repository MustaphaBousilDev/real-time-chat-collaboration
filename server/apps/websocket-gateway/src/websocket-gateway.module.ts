import { Module } from '@nestjs/common';
import { WebsocketGatewayController } from './websocket-gateway.controller';
import { WebsocketGatewayService } from './websocket-gateway.service';

@Module({
  imports: [],
  controllers: [WebsocketGatewayController],
  providers: [WebsocketGatewayService],
})
export class WebsocketGatewayModule {}
