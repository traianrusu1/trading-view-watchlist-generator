/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement, useState, useRef } from 'react';
import axios from 'axios';
import styles from './Controls.module.css';

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
    const res = await axios.get('https://api.binance.com/api/v1/exchangeInfo');
    const btcSymbolCSV = res.data.symbols
      .filter((item: any): boolean => item.quoteAsset === 'BTC' && item.status !== 'BREAK')
      .sort((a: any, b: any) => (a.baseAsset > b.baseAsset ? 1 : -1))
      .reduce((csvString: string, item: any) => {
        return `${csvString}BINANCE:${item.symbol},`;
      }, '');

    download('BinanceWatchlist.txt', btcSymbolCSV);
  };

  return (
    <div className={styles.btnContainer}>
      <a
        className={styles.downloadHiddenTag}
        href={file}
        download={fileName}
        ref={fileDownloadRef}
      />
      <button type="button" className={styles.btn} onClick={getBinance}>
        Binance
      </button>
      <button type="button">Kucoin</button>
    </div>
  );
}

export default Controls;
