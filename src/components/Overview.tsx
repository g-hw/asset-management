import { useContext } from "react"
import { MyContext } from "../App"
import { calculatePortfolioValue } from "../utils"
import { useCryptoData } from "../hooks/useCryptoData"

const Overview = () => {
  const { assetData } = useContext(MyContext)
  const { data } = useCryptoData(assetData)

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-white">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <div className="shadow-md rounded-lg p-6 border-solid border-2 border-gray-600">
          <h2 className="text-xl font-semibold mb-2 text-gray-400">
            No. of Assets in Portfolio
          </h2>
          <p className="text-3xl text-white mb-1">{assetData.length}</p>
        </div>
        <div className="shadow-md rounded-lg p-6 border-solid border-2 border-gray-600">
          <h2 className="text-xl font-semibold mb-2 text-gray-400">
            Total Portfolio Value
          </h2>
          <p className="text-3xl text-white mb-1">
            {calculatePortfolioValue(assetData, data)}
          </p>
        </div>
      </div>
    </>
  )
}

export default Overview
