import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { WeaknetModule } from './module/weaknet/weaknet.module';

@Module({
  imports: [WeaknetModule, UserModule],
})
export class AppModule {}
