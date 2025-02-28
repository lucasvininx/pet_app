"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Input from "../components/Input"
import Button from "../components/Button"
import PetLogo from "../components/PetLogo"

interface LoginScreenProps {
  onRegisterPress: () => void
  onLoginSuccess: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onRegisterPress, onLoginSuccess }) => {
  const theme = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleLogin = () => {
    setErrors({})

    let hasError = false
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "E-mail é obrigatório"
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido"
      hasError = true
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    // Simular um processo de login
    setTimeout(() => {
      setLoading(false)
      console.log("Login com:", { email, password })
      onLoginSuccess() // Chama a função de sucesso do login
    }, 1500)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <PetLogo size="large" />
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>Bem-vindo de volta!</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
            Entre para continuar na sua comunidade pet
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="seu.email@exemplo.com"
              keyboardType="email-address"
              error={errors.email}
            />

            <Input
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              secureTextEntry
              error={errors.password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <Button title="Entrar" onPress={handleLogin} loading={loading} />

            <View style={styles.registerContainer}>
              <Text style={[styles.registerText, { color: theme.colors.textLight }]}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={onRegisterPress}>
                <Text style={[styles.registerLink, { color: theme.colors.primary }]}>{" Cadastre-se"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  formContainer: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default LoginScreen

