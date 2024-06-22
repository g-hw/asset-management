import { createContext, useEffect, useState } from "react"
import CryptoDashboard from "./components/CryptoDashboard"
import Header from "./components/Header"
import Overview from "./components/Overview"
import { Asset } from "./types"
import { Tabs } from "flowbite-react"

export const MyContext = createContext<{
  assetData: Asset[]
  setAssetData: React.Dispatch<React.SetStateAction<Asset[]>>
  stockData: Asset[]
  setStockData: React.Dispatch<React.SetStateAction<Asset[]>>
}>({
  assetData: [],
  setAssetData: () => {},
  stockData: [],
  setStockData: () => {},
})

function App() {
  const [assetData, setAssetData] = useState<Asset[]>([])
  const [stockData, setStockData] = useState<Asset[]>([])

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("assets") ?? "")
      const stocks = JSON.parse(localStorage.getItem("stocks") ?? "")

      if (items) {
        setAssetData(items)
      }
      if (stocks) {
        setStockData(stocks)
      }
    } catch (err) {
      setAssetData([])
      setStockData([])
    }
  }, [])

  useEffect(() => {
    if (assetData.length > 0) {
      localStorage.setItem("assets", JSON.stringify(assetData))
    }
    if (stockData.length > 0) {
      localStorage.setItem("stocks", JSON.stringify(stockData))
    }
  }, [assetData, stockData])

  return (
    <>
      <MyContext.Provider
        value={{
          assetData,
          setAssetData,
          stockData,
          setStockData,
        }}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Overview />
          <Tabs variant="pills" className="pt-6">
            <Tabs.Item active title="Cryptocurrency">
              <CryptoDashboard />
            </Tabs.Item>
            <Tabs.Item title="Stocks">
              {/* <StockDashboard /> */}
              <p className="text-white text-center">
                Similar to Cryptocurrency tab but not implemented due to
                limitations of API
              </p>
            </Tabs.Item>
          </Tabs>
        </div>
      </MyContext.Provider>
    </>
  )
}

export default App
