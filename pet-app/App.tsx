"use client"

import { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, StatusBar } from "react-native"
import { ThemeProvider } from "./context/ThemeContext"
import SplashScreen from "./screens/SplashScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import PetRegistrationScreen from "./screens/PetRegistrationScreen"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"login" | "register" | "petRegistration">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simula um tempo de carregamento para a tela de apresentação
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // 3 segundos

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    console.log("Login bem-sucedido")
    setIsAuthenticated(true)
    setCurrentScreen("petRegistration")
  }

  const handleRegister = () => {
    console.log("Registro bem-sucedido")
    setIsAuthenticated(true)
    setCurrentScreen("petRegistration")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  if (isLoading) {
    return (
      <ThemeProvider>
        <SplashScreen />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {!isAuthenticated ? (
          currentScreen === "login" ? (
            <LoginScreen onRegisterPress={() => setCurrentScreen("register")} onLoginSuccess={handleLogin} />
          ) : (
            <RegisterScreen onLoginPress={() => setCurrentScreen("login")} onRegisterSuccess={handleRegister} />
          )
        ) : (
          <PetRegistrationScreen onLogout={handleLogout} />
        )}
      </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
})

