import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_DB_CONFIG } from '../../config/config.constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      // connectionName: DBNameCnx,
      useFactory: (configService: ConfigService) =>
        configService.get(CONFIG_DB_CONFIG),
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class DatabaseModule { }
