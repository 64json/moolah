import { User, UserDocument } from './user/user.schema';
import { RequestDocument } from './wallet/request.schema';
import { makeRequest } from './utils';
import { PayOrRequestDto } from './wallet/dto/pay-or-request.dto';

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
