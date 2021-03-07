/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement, useState, useRef } from 'react';
import axios from 'axios';
import styles from './Controls.module.css';
import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';
import config from '../config';

function Controls(): ReactElement {
  const fileHrefConfig = 'data:text/plain;charset=utf-8,';
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('watchlist');
  const fileDownloadRef = useRef<HTMLAnchorElement>(null);

  const formatFile = (fileContent: string): string => {
    return `${fileHrefConfig}${encodeURIComponent(fileContent)}`;
  };

  const download = (myFileName: string, text: string): void => {
    setFile(formatFile(text));
    setFileName(myFileName);
    if (fileDownloadRef != null) {
      // eslint-disable-next-line no-unused-expressions
      fileDownloadRef?.current?.click();
    }
  };

  const getBinance = async (): Promise<void> => {
    const res = await axios.get(config.urls.binanceWatchlist);
    const btcSymbolCSV = res.data.symbols
      .filter(
        (item: BinanceSymbolData): boolean => item.quoteAsset === 'BTC' && item.status !== 'BREAK',
      )
      .sort((a: BinanceSymbolData, b: BinanceSymbolData) => (a.baseAsset > b.baseAsset ? 1 : -1))
      .reduce((csvString: string, item: BinanceSymbolData) => {
        return `${csvString}BINANCE:${item.symbol},`;
      }, '');

    download('BinanceWatchlist.txt', btcSymbolCSV);
  };

  const getKucoin = async (): Promise<void> => {
    const res = await axios.get(config.urls.kucoinWatchlist);
    // console.log(res);
    const btcSymbolCSV = res.data.data.reduce((csvString: string, item: KucoinSymbolData) => {
      return `${csvString}KUCOIN:${item.baseCurrency}${item.quoteCurrency},`;
    }, '');

    download('KucoinWatchlist.txt', btcSymbolCSV);
  };

  const getFTX = async (): Promise<void> => {
    const res = await axios.get(config.urls.ftxWatchlist);
    const coinMap: any = {};
    const ftxCSV = res.data.result
      .filter((item: any) => item.type === 'spot')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((csvString: string, item: any) => {
        if (coinMap[item.baseCurrency]) {
          return csvString;
        }
        coinMap[item.baseCurrency] = item.quoteCurrency;
        return `${csvString}FTX:${item.baseCurrency}${item.quoteCurrency},`;
      }, '');

    download('FTXWatchlist.txt', ftxCSV);
  };

  return (
    <div className={styles.btnContainer}>
      <a
        className={styles.downloadHiddenTag}
        href={file}
        download={fileName}
        ref={fileDownloadRef}
      />
      <button type="button" onClick={getBinance}>
        Binance
      </button>
      <button type="button" onClick={getKucoin}>
        Kucoin
      </button>
      <button type="button" onClick={getFTX}>
        FTX
      </button>
    </div>
  );
}

export default Controls;
