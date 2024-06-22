import { stockApiClient } from "../api/apiClient"
import { StockData } from "../types"

export const fetchStockData = async (id: string) => {
  const response = await stockApiClient.get<StockData>("", {
    params: {
      function: "GLOBAL_QUOTE",
      symbol: id,
    },
  })

  return response.data
}
