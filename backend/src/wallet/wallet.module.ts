import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ManualEntry, ManualEntrySchema } from './manual-entry.schema';
import { Request, RequestSchema } from './request.schema';
import { Transfer, TransferSchema } from './transfer.schema';
import { Payout, PayoutSchema } from './payout.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: ManualEntry.name, schema: ManualEntrySchema }]),
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    MongooseModule.forFeature([{ name: Transfer.name, schema: TransferSchema }]),
    MongooseModule.forFeature([{ name: Payout.name, schema: PayoutSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {
}
