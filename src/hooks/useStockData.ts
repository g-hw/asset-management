import { useQuery } from "react-query"
import { Asset, StockData } from "../types"
import { fetchStockData } from "../services/stockService"

export const useStockData = (stockData: Asset[]) => {
  return useQuery<StockData[], Error>(
    ["stockData", stockData],
    async () => {
      const promises = stockData.map((stock) => fetchStockData(stock.id))
      const results = await Promise.all(promises)
      return results
    },
    {
      refetchInterval: 10000, // Refetch data every 10 seconds
      retry: false,
      staleTime: 0,
      cacheTime: 0,
    }
  )
}
