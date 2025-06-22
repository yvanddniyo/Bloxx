import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Developer, This is the backend of the bloxx app.! ';
  }
}
