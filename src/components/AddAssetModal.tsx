import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useState } from "react"

interface AddAssetModalInterface {
  openModal: boolean
  setOpenModal: (val: boolean) => void
}

const AddAssetModal = ({ openModal, setOpenModal }: AddAssetModalInterface) => {
  const [email, setEmail] = useState("")

  function onCloseModal() {
    setOpenModal(false)
    setEmail("")
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              Add asset to portfolio
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="asset" value="Asset name" />
              </div>
              <TextInput
                id="asset"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="quantity" value="Quantity" />
              </div>
              <TextInput id="quantity" type="number" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price purchased" />
              </div>
              <TextInput id="price" type="number" required />
            </div>
            <div className="flex justify-end w-full">
              <Button>Add asset</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddAssetModal
