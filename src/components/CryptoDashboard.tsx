import { useCryptoData } from "../hooks/useCryptoData"
import { formatToPercentage } from "../utils"
import React, { useContext, useState } from "react"
import { MyContext } from "../App"
import { Button, Spinner, TextInput } from "flowbite-react"
import { CryptoData } from "../types"
import CryptoChart from "./CryptoChart"
import EditAssetModal from "./EditAssetModal"
import useCryptoHistoricalData from "../hooks/useCryptoHistoricalData"

const CryptoDashboard = () => {
  const { assetData, setAssetData } = useContext(MyContext)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [editData, setEditData] = useState<{ id: string; quantity: number }>({
    id: "",
    quantity: 0,
  })
  const { data, isLoading: isCryptoDataLoading } = useCryptoData(assetData)
  const {
    data: historicalData,
    refetch: refetchHistoricalData,
    isLoading,
  } = useCryptoHistoricalData(assetData.map((asset) => asset.id))
  const [searchVal, setSearchVal] = useState<string>("")
  const [filteredData, setFilteredData] = useState<CryptoData[]>(data ?? [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value)
    setFilteredData(
      data?.filter((d) =>
        d.name.toLowerCase().includes(event.target.value.toLowerCase())
      ) ?? []
    )
  }

  const handleDelete = (id: string) => {
    setAssetData((prevAssetData) =>
      prevAssetData.filter((asset) => asset.id !== id)
    )
  }

  const handleEdit = (cryptoId: string, quantity: number) => {
    setOpenEditModal(true)
    setEditData({ id: cryptoId, quantity })
    refetchHistoricalData()
  }

  const CryptoRow: React.FC<{
    crypto: CryptoData
    onDelete: (id: string) => void
    onEdit: (id: string, quantity: number) => void
  }> = React.memo(({ crypto, onDelete, onEdit }) => {
    return (
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
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {crypto?.quantity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {crypto.current_price}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {formatToPercentage(crypto.price_change_percentage_24h)}
        </td>
        <td className="flex space-x-2 items-center ">
          <Button onClick={() => onEdit(crypto.id, crypto.quantity ?? 0)}>
            Edit
          </Button>
          <Button onClick={() => onDelete(crypto.id)}>Delete</Button>
          <EditAssetModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            id={editData.id}
            quantity={editData.quantity}
          />
        </td>
      </tr>
    )
  })

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-white">
        Cryptocurrency Portfolio
      </h1>

      {isLoading || isCryptoDataLoading ? (
        <div className="flex items-center justify-center">
          <Spinner aria-label="Large spinner" size="lg" />
        </div>
      ) : (
        <>
          {historicalData && historicalData.length > 0 && (
            <CryptoChart data={historicalData ?? []} />
          )}
          <div className="table-container">
            <TextInput
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchVal}
              onChange={handleSearchChange}
              className="py-8 w-1/4"
              color="info"
            />
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price (USD)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    % Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData ? (
                  filteredData.map((crypto) => (
                    <CryptoRow
                      key={crypto.id}
                      crypto={crypto}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))
                ) : (
                  <tr>
                    <td className="text-center text-white p-4" colSpan={4}>
                      Add cryptocurrency to your portfolio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default CryptoDashboard
