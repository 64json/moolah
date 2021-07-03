import { UserDocument } from './user/user.schema';
import { getCurrency, makeRequest } from './utils';

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
      date_of_birth: '08/14/1998', // TODO: replace with real data
      'address': {
        'name': `${user.firstName} ${user.lastName}`,
        'line_1': '123 Main Street',
        'line_2': '',
        'city': 'Anytown',
        'state': 'NY',
        'country': 'US',
        'zip': '12345',
        'created_at': 1608023967,
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


export async function createCheckoutPage(user: UserDocument, amount: number) {
  const { body: { data } } = await makeRequest('POST', '/v1/checkout', {
    amount,
    country: user.country,
    currency: getCurrency(user.country),
    ewallet: user.walletId,
  });
  return data.redirect_url;
}
