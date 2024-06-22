import { Button, Label, Modal, Select, TextInput } from "flowbite-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CRYPTO_OPTIONS, STOCKS_OPTIONS } from "../constants"
import { Asset, Option } from "../types"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../App"

interface AddAssetModalInterface {
  openModal: boolean
  setOpenModal: (val: boolean) => void
}

interface FormValues {
  name: string
  quantity: number
  price: number
}

const AddAssetModal = ({ openModal, setOpenModal }: AddAssetModalInterface) => {
  const { assetData, setAssetData, stockData, setStockData } =
    useContext(MyContext)
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])

  useEffect(() => {
    // Filter crypto options list to exclude assets already in portfolio
    if (assetData || stockData) {
      const filteredCrypto = CRYPTO_OPTIONS.filter((option) => {
        return !assetData.some((asset) => asset.id === option.value)
      })

      const filteredStocks = STOCKS_OPTIONS.filter((option) => {
        return !stockData.some((asset) => asset.id === option.value)
      })

      setFilteredOptions([...filteredCrypto, ...filteredStocks])
    }
  }, [assetData, stockData])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const [id, name] = data.name.split(",")
    const stockValues = STOCKS_OPTIONS.map((option) => option.value)
    const asset: Asset = {
      id,
      quantity: data.quantity,
      name,
    }

    if (stockValues.includes(id)) {
      setStockData([...stockData, asset])
    } else {
      setAssetData([...assetData, asset])
    }
    setOpenModal(false)
    reset()
  }

  function onCloseModal() {
    setOpenModal(false)
  }

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Add asset to portfolio
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="asset" value="Asset name" />
              </div>
              <Select
                id="asset"
                {...register("name")}
                defaultValue={filteredOptions[0]?.value}
                required
              >
                {filteredOptions?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value + "," + option.label}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="quantity" value="Quantity" />
              </div>
              <TextInput
                id="quantity"
                {...register("quantity")}
                type="text"
                required
              />
            </div>
            <div className="flex justify-end w-full">
              <Button type="submit">Add asset</Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddAssetModal
