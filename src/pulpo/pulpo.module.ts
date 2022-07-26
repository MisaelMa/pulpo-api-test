import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RegistroModule } from './registro/registro.module';

@Module({
    imports: [AuthModule, UserModule, VehiclesModule, RegistroModule],
})
export class PulpoModule { }
