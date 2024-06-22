import React, { useContext, useState } from "react"
import { MyContext } from "../App"
import { Button } from "flowbite-react"
import { StockData } from "../types"
import EditAssetModal from "./EditAssetModal"
import { useStockData } from "../hooks/useStockData"

const StockDashboard = () => {
  const { stockData, setStockData } = useContext(MyContext)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [editData, setEditData] = useState<{ id: string; quantity: number }>({
    id: "",
    quantity: 0,
  })
  const { data } = useStockData(stockData)
  const handleDelete = (id: string) => {
    setStockData((prevStockData) =>
      prevStockData.filter((stock) => stock.id !== id)
    )
  }

  const handleEdit = (stockId: string, quantity: number) => {
    setOpenEditModal(true)
    setEditData({ id: stockId, quantity })
  }

  const StocksRow: React.FC<{
    stock: StockData
    onDelete: (id: string) => void
    onEdit: (id: string, quantity: number) => void
  }> = React.memo(({ stock, onDelete, onEdit }) => {
    return (
      <tr key={stock?.["Global Quote"]?.["01. symbol"]}>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {stock?.["Global Quote"]?.["01. symbol"]}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {
            stockData.find(
              (data) => data.id === stock?.["Global Quote"]?.["01. symbol"]
            )?.quantity
          }
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {stock?.["Global Quote"]?.["05. price"]}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-white">
          {stock?.["Global Quote"]?.["10. change percent"]}
        </td>
        <td className="flex space-x-2 items-center ">
          <Button
            onClick={() =>
              onEdit(
                stock?.["Global Quote"]?.["01. symbol"],
                stock.quantity ?? 0
              )
            }
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(stock?.["Global Quote"]?.["01. symbol"])}
          >
            Delete
          </Button>
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
      <h1 className="text-3xl font-bold mb-8 text-white">Stocks Portfolio</h1>
      <div className="table-container">
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
            {data ? (
              data.map((stock) => (
                <StocksRow
                  key={stock?.["Global Quote"]?.["01. symbol"]}
                  stock={stock}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td className="text-center text-white p-4" colSpan={4}>
                  Add stocks to your portfolio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StockDashboard
