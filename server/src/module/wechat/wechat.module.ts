import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { WechatController } from './wechat.controller';

@Module({
  providers: [WechatService],
  controllers: [WechatController],
})
export class WechatModule {}
