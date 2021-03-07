/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Trending.module.css';
import config from '../../config';
import TrendingList from './TrendlingList';
// import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
// import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';

function Trending(): ReactElement {
  const [coinGeckoTrending, setCoinGeckoTrending] = useState<any[]>([]);
  useEffect(() => {
    async function get(): Promise<void> {
      const res = await axios.get(config.urls.coinGeckoTrending);
      const requests = res.data.coins.map((coin: any): any => {
        return axios.get(config.urls.coinGeckoCoins.replace('{id}', coin.item.id));
      });
      const coinInfo: any = await Promise.all(requests);
      const coinInfoCombined = res.data.coins.map((coin: any) => {
        return {
          trendingData: coin.item,
          generalData: coinInfo.find((item: any): any => item.data.id === coin.item.id).data,
        };
      });

      console.log('coinInfoCombined', coinInfoCombined);

      setCoinGeckoTrending(coinInfoCombined);
    }
    get();
  }, []);
  // console.log(coinGeckoTrending);
  return (
    <div className={styles.trendingContainer}>
      <h1 className={styles.mainHeading}>CoinGecko Trending</h1>
      <section className={styles.listContainer}>
        <TrendingList coinGeckoTrending={coinGeckoTrending} />
      </section>
    </div>
  );
}

export default memo(Trending);
