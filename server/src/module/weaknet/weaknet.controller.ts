import { Body, Controller, Get, Put } from '@nestjs/common';
import { WeaknetService } from './weaknet.service';
let n = 10;
@Controller('/weaknet')
export class WeaknetController {
  constructor(private readonly weaknetService: WeaknetService) {}

  @Get('/hello')
  hello() {
    console.log('hello');
    return 'Hello World! proveAxios';
  }

  @Get('/helloTimeout')
  helloTimeout() {
    this.weaknetService.sleep(1000);
    console.log('helloTimeout');
    return 'Hello World! proveAxios';
  }

  @Get('/delay')
  delay(@Body() mark: { mark: string }) {
    console.log('tag', mark.mark);
    this.weaknetService.sleep(n * 1000);
    n -= 3;
    return `delay${n}-${mark.mark}`;
  }
  @Put('/setDelay')
  setDelay(@Body() parans: { start: number }) {
    n = parans.start;
    return `set${n}`;
  }
}
