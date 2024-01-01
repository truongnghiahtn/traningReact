import SideBar from "./SideBar"
import { FaBars } from 'react-icons/fa';
import { useState,useRef,useEffect } from "react";
import "./admin.scss";

const Admin =(props)=>{ 
    const [collapsed,setCollapsed]= useState(false);

    return(
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar  collapsed={collapsed}/>
            </div>
            <div className="admin-content" style={{width:"100vw"}}>
                <div className="header-admin">
                    <FaBars onClick={()=>{setCollapsed(!collapsed)}}/>
                </div>
                content
            </div>
        </div>
    )
}
export default Admin