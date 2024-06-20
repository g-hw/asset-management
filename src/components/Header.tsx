import { useState } from "react"
import AddAssetModal from "./AddAssetModal"

const Header = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <header className="shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-semibold ml-2 text-secondary">
            Teleskop Asset Management
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="bg-secondary text-black hover:bg-gray-300 text-white px-4 py-2 rounded-md"
          >
            Add Asset
          </button>
        </div>
      </div>
      <AddAssetModal openModal={openModal} setOpenModal={setOpenModal} />
    </header>
  )
}

export default Header
