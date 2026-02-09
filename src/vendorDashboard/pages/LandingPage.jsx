import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar';
import Login from '../Components/forms/Login';
import Register from '../Components/forms/Register';
import AddFirm from '../Components/forms/AddFirm';
import AddProduct from '../Components/forms/AddProduct';
import Welcome from '../Components/Welcome';
import GetFirms from '../Components/forms/GetFirms';
import GetProducts from '../Components/forms/GetProducts';
import GetVendor from '../Components/forms/GetVendor';
import GetProductDetails from '../Components/forms/GetProductDetails';
const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAddFirm, setShowAddFirm] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showWelcome, setshowWelcome] = useState(false);
    const [showFirms, setShowFirms] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showVendor, setSHowVendor] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showProductDetails,setshowProductDetails ]=useState(false);
    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogout(true);
        }
    }, [])
    const showLoginHandler = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setshowWelcome(false);
        setShowFirms(false);
        setShowProducts(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showRegisterHandler = () => {
        setShowRegister(true);
        setShowLogin(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setshowWelcome(false);
        setShowFirms(false);
        setShowProducts(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showAddFirmHandler = () => {
        setShowAddFirm(true);
        setShowLogout(true);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setshowWelcome(false);
        setShowFirms(false);
        setShowProducts(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showAddProductHandler = () => {
        setShowAddProduct(true);
        setShowLogout(true);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setshowWelcome(false);
        setShowFirms(false);
        setShowProducts(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showWelcomeHandler = () => {
        setshowWelcome(true);
        setShowLogout(true);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setShowFirms(false);
        setShowProducts(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showFirmsHandler = () => {
        setShowFirms(true);
        setShowLogout(true);
        setShowProducts(false);
        setshowWelcome(false);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showProductsHandler = () => {
        setShowProducts(true);
        setShowLogout(true);
        setShowFirms(false);
        setshowWelcome(false);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setSHowVendor(false);
        setshowProductDetails(false);
    }
    const showVendorHandler = () => {
        setSHowVendor(true);
        setShowProducts(false);
        setShowFirms(false);
        setshowWelcome(false);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setshowProductDetails(false);
        setShowLogout(true);
    }
    const showLogoutHandler=()=>{
        confirm(`Do you want to Logout ?`)
        localStorage.clear();
        setShowLogout(false);
        setSHowVendor(false);
        setShowProducts(false);
        setShowFirms(false);
        setshowWelcome(false);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setshowProductDetails(false);
    }
    const productDetailsHandler=()=>{
        setshowProductDetails(true);
        setShowLogout(true);
        setSHowVendor(false);
        setShowProducts(false);
        setShowFirms(false);
        setshowWelcome(false);
        setShowAddFirm(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
    }
    return (
        <>
            <section className="LandingSection">
                <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout}
                showLogoutHandler={showLogoutHandler}/>
                <div className="collectionSection">
                    {<SideBar showAddFirmHandler={showAddFirmHandler} showAddProductHandler={showAddProductHandler}
                        showFirmsHandler={showFirmsHandler} showProductsHandler={showProductsHandler}
                        showVendorHandler={showVendorHandler} />} 
                        
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showAddFirm && <AddFirm showFirmsHandler={showFirmsHandler} />}
                    {showFirms && <GetFirms showProductsHandler={showProductsHandler}/>}
                    {showWelcome && <Welcome />}
                    {showVendor && <GetVendor />}
                    {showProducts && <GetProducts productDetailsHandler={productDetailsHandler} showAddProductHandler={showAddProductHandler} showProductDetails={showProductDetails}/>}
                    {showProductDetails && <GetProductDetails showProductDetails={showProductDetails} />}
                    {showAddProduct && <AddProduct showProductsHandler={showProductsHandler} />}
                </div>

            </section>
        </>
    )
}

export default LandingPage