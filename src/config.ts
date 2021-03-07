const config = {
  urls: {
    coinGeckoTrending: 'https://api.coingecko.com/api/v3/search/trending',
    coinGeckoCoins: 'https://api.coingecko.com/api/v3/coins/{id}',
    binanceWatchlist: 'https://api.binance.com/api/v1/exchangeInfo',
    kucoinWatchlist:
      'https://cors-anywhere.herokuapp.com/https://api.kucoin.com/api/v1/symbols?market=BTC',
    ftxWatchlist: 'https://cors-anywhere.herokuapp.com/https://ftx.com/api/markets',
  },
  theme: {
    colours: {
      darkGreen: '#164A41',
      mediumGreen: '#4D774E',
      lightGreen: '#9DC88D',
      naturalYellow: '#F1B24A',
      white: '#FFFFFF',
    },
  },
};

export default config;
