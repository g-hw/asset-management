import { UseQueryResult, useQuery } from "react-query"
import axios from "axios"
import { CryptoData } from "../types" // Define CryptoData type according to your API response

const fetchCryptoData = async (cryptoIds: string[]) => {
  const response = await axios.get<CryptoData[]>(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: cryptoIds.join(","),
      },
    }
  )
  return response.data
}

export const useCryptoData = (
  cryptoIds: string[]
): UseQueryResult<CryptoData[], Error> => {
  return useQuery(["cryptoData", cryptoIds], () => fetchCryptoData(cryptoIds))
}
