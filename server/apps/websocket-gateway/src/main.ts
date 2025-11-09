import { NestFactory } from '@nestjs/core';
import { WebsocketGatewayModule } from './websocket-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
