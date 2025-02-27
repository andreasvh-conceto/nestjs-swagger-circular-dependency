import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(str: string = 'world'): string {
    return `Hello ${str}!`;
  }
}
