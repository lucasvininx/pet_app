"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Input from "../components/Input"
import Button from "../components/Button"
import PetLogo from "../components/PetLogo"

interface RegisterScreenProps {
  onLoginPress: () => void
  onRegisterSuccess: () => void
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onLoginPress, onRegisterSuccess }) => {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const handleRegister = () => {
    setErrors({})

    let hasError = false
    const newErrors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}

    if (!name) {
      newErrors.name = "Nome é obrigatório"
      hasError = true
    }

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
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
      hasError = true
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Por favor, confirme sua senha"
      hasError = true
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log("Cadastro com:", { name, email, password })
      onRegisterSuccess()
    }, 1500)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <PetLogo size="medium" />
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>Criar Conta</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
            Junte-se à nossa comunidade de amantes de pets hoje
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="Nome Completo"
              value={name}
              onChangeText={setName}
              placeholder="João Silva"
              autoCapitalize="words"
              error={errors.name}
            />

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
              placeholder="Crie uma senha"
              secureTextEntry
              error={errors.password}
            />

            <Input
              label="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <Button title="Cadastrar" onPress={handleRegister} loading={loading} />

            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: theme.colors.textLight }]}>Já tem uma conta?</Text>
              <TouchableOpacity onPress={onLoginPress}>
                <Text style={[styles.loginLink, { color: theme.colors.primary }]}>{" Entrar"}</Text>
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
    marginBottom: 24,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default RegisterScreen

