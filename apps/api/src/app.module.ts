import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { OfferModule } from './offer/offer.module';
import { OfferGroupModule } from './group/group.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    OfferModule,
    OfferGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
