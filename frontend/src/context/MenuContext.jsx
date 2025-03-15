import React, { Children, createContext, useContext, useState } from "react";

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState("")

    const updateMenu = (newValue) => {
        setMenu(newValue)
    }

    const getMenu = () => {
        return menu
    }

    return (
        <MenuContext.Provider value={{ 
            menu, 
            updateMenu, 
            getMenu 
            }}>
                {children}
        </MenuContext.Provider>
    )    
}

export const useMenu = () => {
    return useContext(MenuContext)
}