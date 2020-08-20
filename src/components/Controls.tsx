import React, { ReactElement } from 'react';
import axios from 'axios';
import styles from './Controls.module.css';

function Controls(): ReactElement {
  const download = (filename: string, text: string): void => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const getBinance = async (): Promise<void> => {
    const res = await axios.get('https://api.binance.com/api/v1/exchangeInfo');
    const btcSymbolCSV = res.data.symbols
      .filter((item: any): boolean => item.quoteAsset === 'BTC' && item.status !== 'BREAK')
      .sort((a: any, b: any) => (a.baseAsset > b.baseAsset ? 1 : -1))
      .reduce((csvString: string, item: any) => {
        return `${csvString}BINANCE:${item.symbol},`;
      }, '');
    console.log(btcSymbolCSV);
    download('BinanceWatchlist.txt', btcSymbolCSV);
  };

  return (
    <div className={styles.btnContainer}>
      <button type="button" className={styles.btn} onClick={getBinance}>
        Binance
      </button>
      <button type="button">Kucoin</button>
    </div>
  );
}

export default Controls;
