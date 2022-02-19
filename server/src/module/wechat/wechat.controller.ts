import { Controller, Post, Body } from '@nestjs/common';
import { WechatService } from './wechat.service';

@Controller('wechat')
export class WechatController {
  constructor(private readonly service: WechatService) {}
  @Post('/postAll')
  postAll(@Body() params: any) {
    console.log(params);
    return this.service.getAll('as');
  }
}
