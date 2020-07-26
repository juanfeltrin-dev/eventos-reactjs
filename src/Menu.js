import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Brand from 'react-bootstrap/NavbarBrand';
import { FaBars } from "react-icons/fa";
import sideBarStyle from './styles/SideBar.css'

function Menu() {
    const [sideBar, setSideBar] = useState(false);
    
    return(
        <>
            <div className="sidebar">
                <FaBars onClick={() => setSideBar(!sideBar)} />
            </div>
            <Navbar bg="dark" variant="dark" />
        </>
    );
}

export default Menu;