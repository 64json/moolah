import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ManualEntry, ManualEntrySchema } from './manual-entry.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: ManualEntry.name, schema: ManualEntrySchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {
}
