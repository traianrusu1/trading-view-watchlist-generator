/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement } from 'react';
import TrendingListItem from './TrendingListItem';

// import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
// import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';

interface Props {
  coinGeckoTrending: any[];
}

function TrendingList({ coinGeckoTrending }: Props): ReactElement {
  return (
    <>
      {coinGeckoTrending.map((coin: any): any => (
        <TrendingListItem coinData={coin} key={coin.trendingData.name} />
      ))}
    </>
  );
}

export default TrendingList;
