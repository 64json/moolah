import { User, UserDocument } from './user/user.schema';
import { RequestDocument } from './wallet/request.schema';
import { makeRequest, reformatDate } from './utils';
import { PayOrRequestDto } from './wallet/dto/pay-or-request.dto';
import { Payout } from './wallet/payout.schema';
import { BeneficiaryDto } from './wallet/dto/beneficiary.dto';

export async function createWallet(user: UserDocument) {
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
      date_of_birth: reformatDate(user.dob),
      'address': {
        'name': `${user.firstName} ${user.lastName}`,
        'line_1': user.line1,
        'line_2': user.line2,
        'city': user.city,
        'state': user.state,
        'country': user.country,
        'zip': user.zip,
        'created_at': Date.now() / 1e3 | 0,
      },
    },
  });
  const walletId: string = data.id;
  const walletContactId: string = data.contacts.data[0].id;
  return { walletId, walletContactId };
}

export async function issueCard(user: UserDocument) {
  const { body: { data } } = await makeRequest('POST', '/v1/issuing/cards', {
    ewallet_contact: user.walletContactId,
    country: user.country,
  });
  const cardId: string = data.card_id;
  return { cardId };
}

export async function activateCard(user: UserDocument) {
  await makeRequest('POST', '/v1/issuing/cards/activate', {
    card: user.cardId,
  });
}

export async function blockCard(user: UserDocument) {
  await makeRequest('POST', '/v1/issuing/cards/status', {
    card: user.cardId,
    status: 'block',
  });
}

export async function unblockCard(user: UserDocument) {
  await makeRequest('POST', '/v1/issuing/cards/status', {
    card: user.cardId,
    status: 'unblock',
  });
}

export async function getCard(user: UserDocument) {
  const { body: { data } } = await makeRequest('GET', `/v1/issuing/cards/${user.cardId}`);
  const {
    status,
    card_number: cardNumber,
    cvv: cvc,
    expiration_month: expirationMonth,
    expiration_year: expirationYear,
  } = data;
  return {
    status,
    cardNumber,
    cvc,
    expirationMonth,
    expirationYear,
  };
}

export async function createCheckoutPage(request: RequestDocument) {
  const { recipient } = request;
  const { body: { data } } = await makeRequest('POST', '/v1/checkout', {
    amount: request.amount,
    country: recipient.country,
    currency: request.currency,
    ewallet: recipient.walletId,
    cart_items: [{
      name: `Moolah - Payment Request from ${recipient.firstName} ${recipient.lastName}`,
      amount: request.amount,
      currency: request.currency,
      quantity: 1,
    }],
    metadata: {
      request,
    },
  });
  return data.redirect_url;
}

export async function transferFunds(payer: User, recipient: User, dto: PayOrRequestDto) {
  const request = {
    payer,
    recipient,
    email: dto.email,
    amount: dto.amount,
    currency: dto.currency,
    title: dto.title,
    category: dto.category,
  };

  const { body: { data } } = await makeRequest('POST', '/v1/account/transfer', {
    amount: dto.amount,
    currency: dto.currency,
    source_ewallet: payer.walletId,
    destination_ewallet: recipient.walletId,
    metadata: {
      request,
    },
  });

  const actionDataId = data.id;

  await makeRequest('POST', '/v1/account/transfer/response', {
    id: actionDataId,
    status: 'accept',
    metadata: {
      request,
    },
  });

  return {
    request,
    actionDataId,
  };
}

export async function listWalletTransactions(user: User) {
  const { body: { data } } = await makeRequest('GET', `/v1/user/${user.walletId}/transactions`);
  return data;
}

export async function getWalletTransaction(walletId: string, transactionId: string) {
  const { body: { data } } = await makeRequest('GET', `/v1/user/${walletId}/transactions/${transactionId}`);
  return data;
}

export async function getWalletAccounts(walletId: string) {
  const { body: { data } } = await makeRequest('GET', `/v1/user/${walletId}/accounts`);
  return data;
}

export async function listPayoutMethodTypes(
  amount: number,
  currency: string,
  country: string,
) {
  const { body: { data } } = await makeRequest(
    'GET',
    `/v1/payouts/supported_types?beneficiary_entity_type=individual&beneficiary_country=${country}&sender_entity_type=individual&payout_amount=${amount}&payout_currency=${currency}&sender_country=${country}&sender_currency=${currency}&category=bank`,
  );
  return data;
}

export async function getPayoutRequiredFields(
  payoutMethodType: string,
  amount: number,
  currency: string,
  country: string,
) {
  const { body: { data } } = await makeRequest(
    'GET',
    `/v1/payouts/${payoutMethodType}/details?beneficiary_entity_type=individual&beneficiary_country=${country}&sender_entity_type=individual&payout_amount=${amount}&payout_currency=${currency}&sender_country=${country}&sender_currency=${currency}`,
  );
  return data;
}

export async function payout(payout: Payout, beneficiary: BeneficiaryDto) {
  const { payer, currency } = payout;
  const country = payer.country;
  const payout_method_type = `${country.toLowerCase()}_general_bank`;
  const payment_type = ['mx_general_bank', 'il_general_bank'].includes(payout_method_type) ? 'priority' : 'regular';

  // [BLOCKER] "Get Payout Required Fields" API doesn't return required fields for some payout methods like
  //  'us_general_bank', hence manually mocking some data
  const { body: { data } } = await makeRequest('POST', '/v1/payouts', {
    ewallet: payer.walletId,
    payout_amount: payout.amount,
    payout_currency: currency,
    payout_method_type,
    beneficiary_country: country,
    sender_country: country,
    sender_currency: currency,

    beneficiary: {
      bank_name: beneficiary.bankName,
      account_number: beneficiary.accountNumber,
      name: 'Jane Doe',
      first_name: beneficiary.firstName,
      last_name: beneficiary.lastName,
      address: beneficiary.line1,
      email: payout.email,
      city: beneficiary.city,
      state: beneficiary.state,
      country,
      postcode: beneficiary.zip,

      identification_type: 'SSC',
      identification_value: '123456789',
      bic_swift: 'BUINBGSF',
      ach_code: '123456789',
      payment_type,
      iban: 'A123456789012345',
      sort_code: 123456,
      clabe: '012345678012345678',
    },
    sender: {
      name: `${payer.firstName} ${payer.lastName}`,
      first_name: payer.firstName,
      last_name: payer.lastName,
      address: payer.line1,
      city: payer.city,
      state: payer.state,
      postcode: payer.zip,
      date_of_birth: reformatDate(payer.dob, true),

      phonenumber: '621212938122',
      remitter_account_type: 'Individual',
      source_of_income: 'salary',
      identification_type: 'License No',
      identification_value: '123456789',
      purpose_code: 'ABCDEFGHI',
      account_number: '123456789',
      beneficiary_relationship: 'client',
    },
    beneficiary_entity_type: 'individual',
    description: `Moolah - Payment from ${payer.firstName} ${payer.lastName}`,
    sender_entity_type: 'individual',
    metadata: {
      payout,
    },
  });
  return data;
}
