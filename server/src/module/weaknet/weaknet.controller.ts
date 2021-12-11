import { Controller, Get } from '@nestjs/common';
import { WeaknetService } from './weaknet.service';

@Controller('/weaknet')
export class WeaknetController {
  constructor(private readonly weaknetService: WeaknetService) {}
  @Get('/hello')
  hello() {
    return 'Hello World! proveAxios';
  }

  @Get('/delay')
  delay() {
    this.weaknetService.sleep(3000);
    return 'delay';
  }
}
