import { Module } from '@nestjs/common';
import { WeaknetController } from './weaknet.controller';
import { WeaknetService } from './weaknet.service';

@Module({
  controllers: [WeaknetController],
  providers: [WeaknetService],
})
export class WeaknetModule {}
