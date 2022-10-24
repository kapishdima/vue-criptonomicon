const API_KEY = '576d6cf6496e08dc50987ab7282e8a63a3b15f43abde967b3b36a1a1a0426bed';
const BASE_URL = 'https://min-api.cryptocompare.com';

const request = async (url, { method, params }) => {
  const response = await fetch(`${BASE_URL}/${url}?${params}`, {
    method,
    headers: {
      Authorization: `Apikey ${API_KEY}`,
    },
  });

  return await response.json();
};

export const getCoins = async () => {
  const coins = await request('data/all/coinlist', { method: 'GET', params: 'summary=true' });

  return Object.keys(coins.Data);
};

export const getPrice = async (coint) => {
  const price = await request('data/price', {
    method: 'GET',
    params: `fsym=${coint}&tsyms=USD`,
  });

  return normalizePrice(price.USD);
};

export const searchCoins = (query, coins) => {
  if (!query) {
    return [];
  }

  return coins.filter((coin) => coin.toLowerCase().indexOf(query.toLowerCase()) > -1).splice(0, 4);
};

const normalizePrice = (price) => {
  return price > 1 ? price : price.toPrecision();
};
