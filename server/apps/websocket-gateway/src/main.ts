import { NestFactory } from '@nestjs/core';
import { WebsocketGatewayModule } from './websocket-gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketGatewayModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        //kafka broker
        brokers: ['localhost:9092'],
      },
      consumer: {
        // specify uniqueID for consumer
        groupId: 'websocket-gateway-consumer',
      },
    },
  });
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
