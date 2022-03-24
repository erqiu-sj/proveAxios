/*
 * @Author: 邱狮杰
 * @Date: 2021-12-11 13:26:52
 * @LastEditTime: 2022-03-22 10:21:11
 * @Description:
 * @FilePath: /proveAxios/server/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();
