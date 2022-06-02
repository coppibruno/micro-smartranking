import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import { DesafiosModule } from './desafios/desafios.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    DesafiosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
