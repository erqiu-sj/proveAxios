import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { WeaknetModule } from './module/weaknet/weaknet.module';
import { WechatModule } from './module/wechat/wechat.module';

@Module({
  imports: [WeaknetModule, UserModule, WechatModule],
})
export class AppModule {}
