/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactElement } from 'react';
import styles from './TrendingListItemLine.module.css';

// import { BinanceSymbolData } from '../interfaces/BinanceSymbolData';
// import { KucoinSymbolData } from '../interfaces/KucoinSymbolData';

interface Props {
  label: string;
  value: string | number;
  isPercentage?: boolean;
}

function TrendingListItemLine({ label, value, isPercentage = false }: Props): ReactElement {
  return (
    <div className={styles.itemLine}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {value}
        {value && isPercentage && ' %'}
      </span>
    </div>
  );
}

export default TrendingListItemLine;
