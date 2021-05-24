import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
//import { MongooseModule } from '@nestjs/mongoose';
//import {  ProductsModule } from './product/product.module';

@Module({
  imports: [
  ConfigModule.forRoot(),
 ProductsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_CONTAINER')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DB')}`,
      }),
      inject: [ConfigService],
    })
   ],
   
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}