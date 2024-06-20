import React from "react"
import { useCryptoData } from "../hooks/useCryptoData"
import { formatToPercentage } from "../utils"

const CryptoDashboard: React.FC = () => {
  const cryptoIds = ["bitcoin", "ethereum", "ripple"]
  const { data } = useCryptoData(cryptoIds)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Portfolio</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Price (USD)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              % Change
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((crypto) => (
            <tr key={crypto.id}>
              <td className="flex items-center px-6 py-4 whitespace-nowrap text-white">
                <img
                  src={crypto.image}
                  alt="crypto icon"
                  width="24"
                  height="24"
                  className="mr-2"
                />
                {crypto.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white">5</td>
              <td className="px-6 py-4 whitespace-nowrap text-white">
                {crypto.current_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white">
                {formatToPercentage(crypto.price_change_percentage_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoDashboard
