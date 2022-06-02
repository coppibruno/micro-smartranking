import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';


@Module({
  imports: [
    RankingsModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot('mongodb+srv://mongodb:VMOTW85MIUhMiicf@cluster0.alj9b.mongodb.net/srdesafios?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    ProxyRMQModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
