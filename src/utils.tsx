import {
  Asset,
  CryptoData,
  CustomCryptoHistoricalData,
  DataPoint,
} from "./types"

export const formatToUSD = (amount: number): string => {
  // Format number to USD currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const formatToPercentage = (value: number): string => {
  // Format number to percentage
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100) // Convert value to percentage (e.g., 0.5 to 50%)
}

export const calculatePortfolioValue = (
  assets: Asset[],
  data: CryptoData[] | undefined
) => {
  let totalValue = 0

  // Iterate through assets
  assets.forEach((asset) => {
    // Find corresponding price in CryptoData
    const crypto = data?.find((crypto) => crypto.id === asset.id)
    if (crypto) {
      // Calculate value of this asset and add to total
      totalValue += asset.quantity * crypto.current_price
    } else {
      console.warn(`Crypto data not found for asset with id ${asset.id}`)
    }
  })

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalValue)
}

export async function transformData(
  assetData: Asset[],
  historicalData: CustomCryptoHistoricalData[]
): Promise<DataPoint[]> {
  let combinedData: { timestamp: number; price: number }[] = []
  const aggregatedPrices: Record<number, number> = {}
  const aggregatedDataPoints: Record<number, number> = {}

  for (const asset of assetData) {
    const assetDataPoints = historicalData.find(
      (d) => d.id === asset.id
    )?.dataPoints

    if (assetDataPoints) {
      for (const dataPoint of assetDataPoints) {
        const { timestamp, price } = dataPoint

        const adjustedPrice = price * asset.quantity
        if (aggregatedPrices[timestamp]) {
          aggregatedPrices[timestamp] += adjustedPrice
          aggregatedDataPoints[timestamp] += 1
        } else {
          aggregatedPrices[timestamp] = adjustedPrice
          aggregatedDataPoints[timestamp] = 1
        }
      }
    }
  }
  combinedData = Object.keys(aggregatedPrices)
    .map((timestampString) => ({
      timestamp: parseInt(timestampString),
      price: aggregatedPrices[parseInt(timestampString)],
      dataPoints: aggregatedDataPoints[parseInt(timestampString)],
    }))
    .filter((data) => data.dataPoints === assetData.length)

  combinedData.sort((a, b) => a.timestamp - b.timestamp)

  return combinedData
}
