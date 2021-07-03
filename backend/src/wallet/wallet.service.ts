import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/user.schema';
import { makeRequest } from '../utils';

@Injectable()
export class WalletService {
  async createWallet(user: UserDocument): Promise<{ walletId: string, walletContactId: string }> {
    const { body: { data } } = await makeRequest('POST', '/v1/user', {
      first_name: user.firstName,
      last_name: user.lastName,
      ewallet_reference_id: user._id,
      contact: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        country: user.country,
        contact_type: 'personal',
      },
    });
    const walletId = data.id;
    const walletContactId = data.contacts.data[0].id;
    return { walletId, walletContactId };
  }
}
