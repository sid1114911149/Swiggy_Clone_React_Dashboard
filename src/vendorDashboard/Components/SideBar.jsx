import React from 'react'

const SideBar = ({showAddFirmHandler,showAddProductHandler,showFirmsHandler,showProductsHandler,showVendorHandler}) => {
  return (
    <div>
        <div className="sideBarSection">
            <ul>
                <li onClick={showAddFirmHandler}>Add Firm</li>
                {/* <li onClick={showAddProductHandler}>Add Products</li> */}
                <li onClick={showFirmsHandler} >Get All Firms</li>
                {/* <li onClick={showProductsHandler}>Get All Products</li> */}
                <li onClick={showVendorHandler}>User</li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar