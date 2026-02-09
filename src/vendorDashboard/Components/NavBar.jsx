import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogout, showLogoutHandler }) => {
    const [vendorName, setVendorName] = useState("");
    const navigate = useNavigate();

    const Home = () => {
        navigate("/"); 
    };

    const Back = () => {
        window.history.back();
    };


    const getVendor = async () => {
        try {
            const token = localStorage.getItem('loginToken');
            if (!token) return;

            const payload = JSON.parse(atob(token.split('.')[1]));
            const vendorid = payload.vendorId;

            const response = await fetch(
                `${API_URL}/vendor/get-details/${vendorid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) return;

            const data = await response.json();
            setVendorName(data.username);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (showLogout) getVendor();
    }, [showLogout]);

    return (
        <div className="navSection">
            <div className="company">
                <button onClick={Home}>SUBY</button>
                <button onClick={Back}>Back</button>
            </div>

            {showLogout && <h3>Hello, {vendorName}</h3>}

            <div className="userAuth">
                {!showLogout ? (
                    <>
                        <span onClick={showLoginHandler}>Login</span>
                        <span onClick={showRegisterHandler}>Register</span>
                    </>
                ) : (
                    <span onClick={showLogoutHandler}>LogOut</span>
                )}
            </div>
        </div>
    );
};

export default NavBar;
