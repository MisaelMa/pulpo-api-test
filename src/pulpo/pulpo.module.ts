import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
    imports: [AuthModule, UserModule, VehiclesModule],
})
export class PulpoModule { }
