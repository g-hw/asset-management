import { useQuery } from "react-query"
import { CoinList, Option } from "../types"
import { fetchCoinList } from "../services/cryptoService"

export const useCoinList = () => {
  const { data: coinListData, ...queryRest } = useQuery<CoinList[], Error>({
    queryKey: ["coinList"],
    queryFn: fetchCoinList,
  })

  const transformDataToOptionsFormat = (data: CoinList[]): Option[] => {
    return data.map((coin) => ({
      value: coin.id,
      label: `${coin.name} (${coin.symbol})`,
    }))
  }

  const options = coinListData ? transformDataToOptionsFormat(coinListData) : []

  return {
    ...queryRest,
    data: coinListData,
    options,
  }
}
