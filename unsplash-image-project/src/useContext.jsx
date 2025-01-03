import { createContext, useContext, useState, useEffect } from "react"

//! warp the main.jsx by AppContext
const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("universe")
  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}

//! all value  are store in useGlovalContext
export const useGlovalContext = () => useContext(AppContext)
