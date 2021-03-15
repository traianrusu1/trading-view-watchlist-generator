function getCorsProxyUrl(url: string): string {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}

const config = {
  urls: {
    coinGeckoTrending: 'https://api.coingecko.com/api/v3/search/trending',
    coinGeckoCoins: 'https://api.coingecko.com/api/v3/coins/{id}',
    binanceWatchlist: 'https://api.binance.com/api/v1/exchangeInfo',
    bittrexWatchlist: getCorsProxyUrl('https://api.bittrex.com/api/v1.1/public/getmarkets'),
    huobiWatchlist: getCorsProxyUrl('https://api.huobi.pro/market/tickers'),
    kucoinWatchlist: getCorsProxyUrl('https://api.kucoin.com/api/v1/symbols?market=BTC'),
    ftxWatchlist: getCorsProxyUrl('https://ftx.com/api/markets'),
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
