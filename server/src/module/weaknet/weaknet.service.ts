import { Injectable } from '@nestjs/common';

@Injectable()
export class WeaknetService {
  sleep(ms: number) {
    const start = new Date().getTime();
    while (true) if (new Date().getTime() - start > ms) break;
  }
}
