import React, { createContext, useState } from 'react';

// Crea el contexto de usuario
export const UserContext = createContext();

// Crea el proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  const [userData, setUser] = useState({
    display_name: '',
  });

  // Función para establecer el usuario
  const setUserContext = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ userData, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};