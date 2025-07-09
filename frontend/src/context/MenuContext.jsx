import React, { createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState('Главная');

  // При монтировании компонента загружаем сохраненное меню
  useEffect(() => {
    const savedMenu = localStorage.getItem('currentMenu');
    if (savedMenu) {
      setMenu(savedMenu);
    }
  }, []);

  const updateMenu = (newMenu) => {
    setMenu(newMenu);
    localStorage.setItem('currentMenu', newMenu);
  };

  const getMenu = () => {
    return menu;
  };

  return (
    <MenuContext.Provider value={{ menu, updateMenu, getMenu }}>
      {children}
    </MenuContext.Provider>
  );
};