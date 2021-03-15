/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement, useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import styles from './Controls.module.css';
import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';
import config from '../config';

function Controls(): ReactElement {
  const fileHrefConfig = 'data:text/plain;charset=utf-8,';
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('watchlist');
  const [baseCurr, setBaseCurr] = useState('btc');
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
      .filter((item: BinanceSymbolData): boolean => {
        if (baseCurr === 'btc') {
          return item.quoteAsset === 'BTC' && item.status !== 'BREAK';
        }

        return item.quoteAsset === 'USDT' && item.status !== 'BREAK';
      })
      .sort((a: BinanceSymbolData, b: BinanceSymbolData) => (a.baseAsset > b.baseAsset ? 1 : -1))
      .reduce((csvString: string, item: BinanceSymbolData) => {
        return `${csvString}BINANCE:${item.symbol},`;
      }, '');

    const textFileName =
      baseCurr === 'btc' ? 'BinanceWatchlistBTC.txt' : 'BinanceWatchlistUSDT.txt';

    download(textFileName, btcSymbolCSV);
  };

  const getKucoin = async (): Promise<void> => {
    const res: any = await axios.get(config.urls.kucoinWatchlist);
    const resJson = JSON.parse(res.data.contents);

    const btcSymbolCSV = resJson.data.reduce((csvString: string, item: KucoinSymbolData) => {
      return `${csvString}KUCOIN:${item.baseCurrency}${item.quoteCurrency},`;
    }, '');

    download('KucoinWatchlist.txt', btcSymbolCSV);
  };
  const getBittrex = async (): Promise<void> => {
    const res = await axios.get(config.urls.bittrexWatchlist);
    const resJson = JSON.parse(res.data.contents);
    const btcSymbolCSV = resJson.result.reduce((csvString: string, item: any) => {
      if (item.BaseCurrency !== 'BTC') {
        return csvString;
      }
      return `${csvString}BITTREX:${item.MarketCurrency}${item.BaseCurrency},`;
    }, '');

    download('BittrexWatchlist.txt', btcSymbolCSV);
  };
  const getHuobi = async (): Promise<void> => {
    const res = await axios.get(config.urls.huobiWatchlist);
    const resJson = JSON.parse(res.data.contents);
    // const coinMap: any = {};

    console.log(resJson);
    const btcSymbolCSV = resJson.data.reduce((csvString: string, item: any) => {
      // if (coinMap[item.baseCurrency]) {
      //   return csvString;
      // }
      // coinMap[item.baseCurrency] = item.quoteCurrency;
      if (!item.symbol.includes('usdt')) {
        return csvString;
      }
      return `${csvString}HUOBI:${item.symbol.toUpperCase()},`;
    }, '');

    download('HuobiWatchlist.txt', btcSymbolCSV);
  };

  const getFTX = async (): Promise<void> => {
    const res = await axios.get(config.urls.ftxWatchlist);
    const resJson = JSON.parse(res.data.contents);

    const coinMap: any = {};
    const ftxCSV = resJson.result
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

  const onBaseCurrChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setBaseCurr(e.currentTarget.value);
  };

  return (
    <>
      <div />
      <div className={styles.btnContainer}>
        <a
          className={styles.downloadHiddenTag}
          href={file}
          download={fileName}
          ref={fileDownloadRef}
        />
        <div className={styles.binanceControls}>
          <button type="button" onClick={getBinance}>
            Binance
          </button>
          <select onChange={onBaseCurrChange} defaultValue={baseCurr} className={styles.baseSelect}>
            <option value="btc">BTC</option>
            <option value="usd">USD</option>
          </select>
        </div>

        <button type="button" onClick={getKucoin}>
          Kucoin
        </button>
        <button type="button" onClick={getFTX}>
          FTX
        </button>
        <button type="button" onClick={getBittrex}>
          Bittrex
        </button>
        <button type="button" onClick={getHuobi}>
          Huobi
        </button>
      </div>
    </>
  );
}

export default Controls;
