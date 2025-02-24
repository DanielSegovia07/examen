import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZapatosModule } from './zapatos/zapatos.module';
import { VentaModule } from './venta/venta.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:  'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ZapatosModule,
    VentaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
