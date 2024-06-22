import { useContext, useEffect, useState } from "react"
import Chart from "./common/Chart"
import { MyContext } from "../App"
import { CustomCryptoHistoricalData, DataPoint } from "../types"
import { transformData } from "../utils"

interface CryptoChartProps {
  data: CustomCryptoHistoricalData[]
}

const CryptoChart = ({ data }: CryptoChartProps) => {
  const [chartData, setChartData] = useState<DataPoint[]>([])
  const { assetData } = useContext(MyContext)

  useEffect(() => {
    if (data) {
      transformData(assetData, data).then((combinedData) => {
        setChartData(combinedData)
      })
    }
  }, [data, assetData])

  return (
    <>
      <h2 className="text-white text-center pb-3">Past Month Performance</h2>
      <Chart data={chartData} />
    </>
  )
}

export default CryptoChart
