import React from 'react'
import "./DropDownAddMenu.css"
import { Link } from 'react-router-dom'

const DropDownAddMenu = ({ showAddMenu, setShowAddMenu }) => {
    return (
        <div className={`${showAddMenu ? "dropdownAddMenu" : "dropdownAddMenuHide"}`}>
            <div className="ddAddMenu">
                <Link to="/addnews"><p onClick={() => setShowAddMenu(false)}>Add News</p></Link>
                <Link to="/addmagazine"><p onClick={() => setShowAddMenu(false)}>Add Magazine</p></Link>
                <Link to="/add/advertisement"><p onClick={() => setShowAddMenu(false)}>Add AD</p></Link>
            </div>
        </div>
    )
}

export default DropDownAddMenu
