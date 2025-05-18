import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'account_service',
    }),
    AuthModule,
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
