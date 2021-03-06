/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement } from 'react';
import styles from './TrendingListItem.module.css';
import TrendingListItemLine from './TrendingListItemLine';

// import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
// import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';

interface Props {
  coinData: any;
}

function TrendingListItem({ coinData }: Props): ReactElement {
  const handleItemClick = (): void => {
    window.open(
      `https://www.coingecko.com/en/coins/${coinData.trendingData.id}`,
      `_newtab${Date.now()}`,
    );
  };
  return (
    <article className={styles.item} onClick={handleItemClick}>
      <div className={styles.itemHeaderSection}>
        <img src={coinData.trendingData.thumb} alt={coinData.trendingData.name} />
        <span className={styles.itemSymbol}>{coinData.trendingData.symbol}</span>
      </div>
      <div className={styles.itemTitle}>{coinData.trendingData.name}</div>

      <section className={styles.dataGroup}>
        <h3 className={styles.groupHeading}>Rank & Score</h3>
        <TrendingListItemLine label="Cap Rank" value={coinData.generalData.market_cap_rank} />
        <TrendingListItemLine
          label="CoinGecko Score"
          value={coinData.generalData.coingecko_score?.toFixed(2)}
        />
        <TrendingListItemLine
          label="Community Score"
          value={coinData.generalData.community_score?.toFixed(2)}
        />
        <TrendingListItemLine
          label="Up Votes"
          value={coinData.generalData.sentiment_votes_up_percentage?.toFixed(2)}
          isPercentage
        />
        <TrendingListItemLine
          label="Down Votes"
          value={coinData.generalData.sentiment_votes_down_percentage?.toFixed(2)}
          isPercentage
        />
      </section>
      <section className={styles.dataGroup}>
        <h3>Price Change (BTC)</h3>
        <TrendingListItemLine
          label="Last 24 Hours"
          value={coinData.generalData.market_data.price_change_percentage_24h_in_currency?.btc?.toFixed(
            2,
          )}
          isPercentage
        />
        <TrendingListItemLine
          label="Last 7 Days"
          value={coinData.generalData.market_data.price_change_percentage_7d_in_currency?.btc?.toFixed(
            2,
          )}
          isPercentage
        />
        <TrendingListItemLine
          label="Last 14 Days"
          value={coinData.generalData.market_data.price_change_percentage_14d_in_currency?.btc?.toFixed(
            2,
          )}
          isPercentage
        />
        <TrendingListItemLine
          label="Last 30 Days"
          value={coinData.generalData.market_data.price_change_percentage_30d_in_currency?.btc?.toFixed(
            2,
          )}
          isPercentage
        />
        <TrendingListItemLine
          label="Last 60 Days"
          value={coinData.generalData.market_data.price_change_percentage_60d_in_currency?.btc?.toFixed(
            2,
          )}
          isPercentage
        />
      </section>
    </article>
  );
}

export default TrendingListItem;
