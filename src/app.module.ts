import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core';
import { JwtAuthGuard } from './pulpo/auth/guards/jwt-auth.guard';
import { PulpoModule } from './pulpo/pulpo.module';

@Module({
  imports: [CoreModule, PulpoModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule { }
