import { User, UserDocument } from './user/user.schema';
import { RequestDocument } from './wallet/request.schema';
import { makeRequest } from './utils';
import { PayOrRequestDto } from './wallet/dto/pay-or-request.dto';
import * as util from 'util';

export async function createWallet(user: UserDocument) {
  const [yyyy, mm, dd] = user.dob.split('-');

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
      date_of_birth: `${mm}/${dd}/${yyyy}`,
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
      name: `Moolah - Request from ${recipient.firstName} ${recipient.lastName}`,
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
  await makeRequest('POST', '/v1/account/transfer', {
    amount: dto.amount,
    currency: dto.currency,
    source_ewallet: payer.walletId,
    destination_ewallet: recipient.walletId,
    metadata: {
      request: {
        payer,
        recipient,
        email: dto.email,
        amount: dto.amount,
        currency: dto.currency,
        title: dto.title,
        category: dto.category,
      },
    },
  });
}

export async function listWalletTransactions(user: User) {
  // TODO: needs pagination / caching but issok for hackathon ¯\_(ツ)_/¯
  const { body: { data } } = await makeRequest('GET', `/v1/user/${user.walletId}/transactions`);
  const responses: any[] = await Promise.all(data.map(transaction =>
    makeRequest('GET', `/v1/user/${user.walletId}/transactions/${transaction.id}`)),
  );

  console.log(util.inspect(responses, true, null, true));

  const transactions = responses
    .map(response => {
      const {
        id,
        action_data,
        type,
        amount,
        currency,
        balance,
        created_at,
      } = response.body.data;
      return {
        id,
        type,
        amount,
        currency,
        balance,
        created_at,
        metadata: action_data?.metadata,
      };
    })
    .sort((a, b) => b.created_at - a.created_at);

  const balance = transactions.length > 0 ? transactions[0].balance : 0;
  return {
    balance,
    transactions,
  };
}
