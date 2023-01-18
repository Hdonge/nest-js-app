import { Controller, Get, Head, Header, Query, Redirect, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: '1'
})
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('docs')
  @Version('2')
  @Redirect('https://docs.nestjs.com', 301)
  @Header('cache-control', 'none')
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
