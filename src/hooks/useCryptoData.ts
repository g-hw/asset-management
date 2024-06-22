import { UseQueryResult, useQuery } from "react-query"
import { Asset, CryptoData } from "../types"
import { fetchCryptoData } from "../services/cryptoService"

export const useCryptoData = (
  assets: Asset[]
): UseQueryResult<CryptoData[], Error> => {
  return useQuery(["cryptoData", assets], () => fetchCryptoData(assets), {
    retry: false,
    enabled: assets.length > 0,
    refetchInterval: 10000, // Refetch data every 10 seconds due to API limitations
    staleTime: 0,
    cacheTime: 0,
  })
}
