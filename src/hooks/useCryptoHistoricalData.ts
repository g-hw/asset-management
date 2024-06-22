import { useQuery } from "react-query"
import { fetchHistoricalData } from "../services/cryptoService"
import { CustomCryptoHistoricalData } from "../types"

const useCryptoHistoricalData = (coinIds: string[]) => {
  return useQuery<CustomCryptoHistoricalData[], Error>(
    ["historicalData", coinIds],
    async () => {
      const promises = coinIds.map((coinId) => fetchHistoricalData(coinId))
      const results = await Promise.all(promises)
      return results
    },
    {
      enabled: coinIds.length > 0,
      retry: false,
    }
  )
}

export default useCryptoHistoricalData
