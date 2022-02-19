import { Injectable } from '@nestjs/common';

@Injectable()
export class WechatService {
  getAll(text: string): string {
    return text;
  }
}
