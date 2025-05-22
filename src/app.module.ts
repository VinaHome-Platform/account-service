import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './modules/account/account.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'account_service',
    }),
    AuthModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
      console.error('❌ Kết nối MongoDB thất bại!', error);
    }
  }
}
