import { Module } from '@nestjs/common';
import { WeaknetModule } from './module/weaknet/weaknet.module';

@Module({
  imports: [WeaknetModule],
})
export class AppModule {}
