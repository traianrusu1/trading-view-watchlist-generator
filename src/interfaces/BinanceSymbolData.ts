export interface BinanceSymbolData {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: {
    filterType: string;
    minPrice?: string;
    maxPrice?: string;
    tickSize?: string;
    multiplierUp?: string;
    multiplierDown?: string;
    avgPriceMins?: number;
    minQty?: string;
    maxQty?: string;
    stepSize?: string;
    minNotional?: string;
    applyToMarket?: true;
    limit?: number;
    maxNumOrders?: number;
    maxNumAlgoOrders?: number;
  }[];
  permissions: string[];
}
