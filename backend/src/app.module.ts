import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [SimulatorModule],
  controllers: [AppController],
})
export class AppModule {}
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'submitter',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    SubmitterModule,
    ComputeBridgeModule,
    AgentModule,
    AuditLogModule,
  ],
})
export class AppModule {}
