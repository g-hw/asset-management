import React from "react"
import { formatToPercentage, formatToUSD } from "../utils"

const Overview: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="shadow-md rounded-lg p-6 border-solid border-2 border-gray-600">
          <h2 className="text-xl font-semibold mb-2 text-gray-400">
            No. of Assets in Portfolio
          </h2>
          <p className="text-3xl text-white mb-1">5</p>
        </div>
        <div className="shadow-md rounded-lg p-6 border-solid border-2 border-gray-600">
          <h2 className="text-xl font-semibold mb-2 text-gray-400">
            Total Percentage Change
          </h2>
          <p className="text-3xl text-white mb-1">{formatToPercentage(5)}</p>
        </div>
        <div className="shadow-md rounded-lg p-6 border-solid border-2 border-gray-600">
          <h2 className="text-xl font-semibold mb-2 text-gray-400">
            Total Portfolio Value
          </h2>
          <p className="text-3xl text-white mb-1">{formatToUSD(5000)}</p>
        </div>
      </div>
    </div>
  )
}

export default Overview
