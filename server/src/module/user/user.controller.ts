import { Controller, Get, Request } from '@nestjs/common';
let isJumpOverVerify = false;
@Controller('user')
export class UserController {
  @Get('/refreshToken')
  refreshToken(@Request() params: { query: { next: boolean } }) {
    isJumpOverVerify = params.query.next;
    return { code: 200 };
  }
  @Get('/getList')
  getListNeedAuth() {
    if (!isJumpOverVerify) {
      return { code: 301, data: [] };
    }
    return { code: 200, data: [1, 2] };
  }
}
