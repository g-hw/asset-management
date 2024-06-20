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
