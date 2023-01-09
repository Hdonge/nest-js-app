import { Injectable } from '@nestjs/common';
import { Logger } from './shared/services/logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger){
    this.logger.mainContext = 'AppService';
  }
  getHello(): string {
    this.logger.log('Hello world error', 'getHello');
    return 'Hello World!';
  }
}
