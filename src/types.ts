export interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  full_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: string
  last_updated: string
  quantity?: number
}

export interface CoinList {
  id: string
  symbol: string
  name: string
}

export interface Option {
  value: string
  label: string
}

export interface Asset {
  id: string
  name: string
  quantity: number
}

export interface DataPoint {
  timestamp: number
  price: number
  dataPoints?: number // to track number of assets having the same timestamp
}

export interface CryptoHistoricalData {
  prices: number[][]
}

export interface CustomCryptoHistoricalData {
  id: string
  dataPoints: DataPoint[]
}

export interface StockData {
  "Global Quote": StockItem
  quantity?: number
}

export interface StockItem {
  "01. symbol": string
  "05. price": string
  "10. change percent": string
}
