import { Button, Label, Modal, TextInput } from "flowbite-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useContext } from "react"
import { MyContext } from "../App"

interface EditAssetModalInterface {
  openModal: boolean
  setOpenModal: (val: boolean) => void
  id: string
  quantity: number
}

interface FormValues {
  quantity: number
}

const EditAssetModal = ({
  openModal,
  setOpenModal,
  id,
  quantity,
}: EditAssetModalInterface) => {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const { assetData, setAssetData } = useContext(MyContext)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAssetData([
      ...assetData.map((asset) =>
        asset.id === id ? { ...asset, quantity: data.quantity } : asset
      ),
    ])
    setOpenModal(false)
    reset()
  }

  function onCloseModal() {
    setOpenModal(false)
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900">Edit Asset</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Quantity" />
                </div>
                <TextInput
                  id="quantity"
                  {...register("quantity")}
                  type="text"
                  defaultValue={quantity}
                  required
                />
              </div>
              <div className="flex justify-end w-full">
                <Button type="submit">Edit asset</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditAssetModal
