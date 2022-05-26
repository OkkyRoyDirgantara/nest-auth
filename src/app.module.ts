import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
