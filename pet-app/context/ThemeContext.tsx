"use client"

import type React from "react"
import { createContext, useContext } from "react"

const theme = {
  colors: {
    primary: "#4CAF50",
    primaryDark: "#388E3C",
    primaryLight: "#A5D6A7",
    background: "#FFFFFF",
    text: "#333333",
    textLight: "#757575",
    error: "#D32F2F",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    round: 9999,
  },
}

const ThemeContext = createContext(theme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

