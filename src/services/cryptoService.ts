import { cryptoApiClient } from "../api/apiClient"
import { Asset, CryptoData, CryptoHistoricalData } from "../types"

export const fetchCryptoData = async (assets: Asset[]) => {
  const cryptoData: CryptoData[] = []

  const response = await cryptoApiClient.get<CryptoData[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: assets.map((asset) => asset.id).join(","),
    },
  })

  response.data.forEach((data: CryptoData) => {
    cryptoData.push({
      ...data,
      quantity: assets.find((asset) => asset.id === data.id)?.quantity,
    })
  })
  return cryptoData
}

export const fetchCoinList = async () => {
  const response = await cryptoApiClient.get<CryptoData[]>("/coins/list")
  return response.data
}

export const fetchHistoricalData = async (coinId: string) => {
  const response = await cryptoApiClient.get<CryptoHistoricalData>(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        vs_currency: "usd",
        days: 30, // Adjust as needed for the time frame
        interval: "daily",
      },
    }
  )

  return {
    id: coinId,
    dataPoints: response.data.prices.map((datapoint: number[]) => ({
      timestamp: datapoint[0],
      price: datapoint[1],
    })),
  }
}
